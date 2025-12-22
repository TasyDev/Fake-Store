import { categories } from "../../data/api/getCategory.js";
import { CartManager } from "../../utils/cartManager.js";

class Navbar extends HTMLElement {
    constructor() {
        super();
        this.categories = [];
        this.isCartOpen = false;
    }

    async connectedCallback() {
        try {
            this.categories = await categories();
            this.render();
            this.setupEventListeners();
        } catch (error) {
            console.error("Error fetching categories for navbar:", error);
            this.render();
            this.setupEventListeners();
        }

        window.addEventListener('cart-updated', () => {
            this.renderCart();
        });
    }

    setupEventListeners() {
        const searchInput = this.querySelector("#nav-search");
        const searchInputMobile = this.querySelector("#nav-search-mobile");

        const handleSearch = (query) => {
            if (query.trim()) {
                window.location.href = `/src/views/pages/search/search.html?q=${encodeURIComponent(query.trim())}`;
            }
        };

        if (searchInput) {
            searchInput.addEventListener("keypress", (e) => {
                if (e.key === "Enter") handleSearch(e.target.value);
            });
        }
        if (searchInputMobile) {
            searchInputMobile.addEventListener("keypress", (e) => {
                if (e.key === "Enter") handleSearch(e.target.value);
            });
        }

        this.querySelectorAll('label[for^="nav-search"]').forEach(label => {
            label.addEventListener('click', () => {
                const input = this.querySelector(`#${label.getAttribute('for')}`);
                if (input) handleSearch(input.value);
            });
        });

        const storeButton = this.querySelector("#store-card");
        if (storeButton) {
            storeButton.addEventListener('click', () => {
                this.isCartOpen = !this.isCartOpen;
                this.renderCart();
            });
        }

        // Global click listener for adding to cart
        document.addEventListener("click", (e) => {
            const btn = e.target.closest(".add-to-cart-btn");
            if (!btn) return;

            const card = btn.closest(".product-card");
            if (!card) return;

            const product = {
                id: card.dataset.id,
                title: card.querySelector("h3").textContent.trim(),
                price: card.querySelector(".fs-4").textContent.trim().replace('$', ''),
                img: card.querySelector("img").src
            };

            CartManager.toggleProduct(product);

            // Open cart to show the result if it was closed
            if (!this.isCartOpen) {
                this.isCartOpen = true;
                this.renderCart();
            }
        });

        // Global click listener for cart interactions
        document.addEventListener("click", (e) => {
            const removeBtn = e.target.closest(".remove-btn");
            if (removeBtn) {
                CartManager.removeFromCart(removeBtn.dataset.id);
                return;
            }

            const plusBtn = e.target.closest(".plus-btn");
            if (plusBtn) {
                CartManager.updateQuantity(plusBtn.dataset.id, 1);
                return;
            }

            const minusBtn = e.target.closest(".minus-btn");
            if (minusBtn) {
                CartManager.updateQuantity(minusBtn.dataset.id, -1);
                return;
            }
        });

        // Close cart if clicking outside
        document.addEventListener('click', (e) => {
            const container = document.getElementById("cart-products");
            const storeButton = document.getElementById("store-card");
            const addToCartBtn = e.target.closest(".add-to-cart-btn");

            // If the click is on the store button, it's handled by its own listener
            if (storeButton && storeButton.contains(e.target)) return;

            // If clicking on an "add to cart" button, we already handled opening it
            if (addToCartBtn) return;

            // Robust check for clicking inside the cart dropdown
            // We check if e.composedPath() contains the container or if the click was 
            // on an element with cart-related classes (to handle elements removed during re-render)
            const isClickInsideCart = e.target.closest(".cart-dropdown") ||
                e.target.closest(".remove-btn") ||
                e.target.closest(".plus-btn") ||
                e.target.closest(".minus-btn");

            if (this.isCartOpen && container && !isClickInsideCart) {
                this.isCartOpen = false;
                this.renderCart();
            }
        });
    }

    render() {
        this.innerHTML = `
        <div class="navbar-container sticky-top shadow-sm" style="z-index: 1060;">
            <nav class="navbar navbar-dark black-background d-md-none px-3 pt-2">
                <div class="d-flex w-100 gap-2">
                    <label for="nav-search-mobile" class="green-action-btn transition-all mb-0 px-2" style="cursor: pointer; height: 32px; font-size: 12px;">
                        <span>Buscar</span>
                    </label>
                    <div class="flex-grow-1">
                        <input id="nav-search-mobile" type="text" class="form-control nav-search-input" style="height: 32px; font-size: 12px;" placeholder="Buscar productos...">
                    </div>
                </div>
            </nav>

            <nav class="navbar navbar-dark navbar-top black-background px-2 px-md-4 py-1">
                <div class="d-flex align-items-center justify-content-between h-100 mx-auto w-100" style="max-width: 1200px;">
                    
                    <div class="d-flex align-items-center gap-3">
                        <button class="navbar-toggler border-0 p-0 d-md-none" type="button" data-bs-toggle="collapse" data-bs-target="#categoriesMenu" aria-controls="categoriesMenu" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon" style="width: 24px; height: 24px;"></span>
                        </button>

                        <a href="/" class="d-none d-md-flex align-items-center">
                            <img src="/src/assets/logos/greenlogo.png" alt="Platzi Logo" style="height: 32px;">
                        </a>

                        <div class="d-none d-md-flex align-items-center gap-2">
                            <label for="nav-search" class="green-action-btn transition-all mb-0" style="cursor: pointer;">
                                <span>Buscar</span>
                            </label>
                            <div style="width: 400px;">
                                <input id="nav-search" type="text" class="form-control nav-search-input" placeholder="Buscar productos...">
                            </div>
                        </div>
                    </div>

                    <div>
                        <button id="store-card" class="button-reset position-relative d-flex align-items-center justify-content-center border border-white rounded-circle" style="width: 38px; height: 38px;">
                            <img src="/src/assets/icons/carrito.png" alt="Carrito" style="height: 20px; width: 20px; object-fit: contain;">
                            <span id="cart-count" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style="font-size: 10px; display: none;">
                                0
                            </span>
                        </button>
                    </div>
                </div>
            </nav>

            <nav class="navbar navbar-expand-md navbar-dark navbar-bottom py-1">
                <div class="collapse navbar-collapse" id="categoriesMenu">
                    <ul class="navbar-nav justify-content-center gap-4 m-0 p-0 w-100 text-center">
                        <li class="nav-item">
                            <a href="/" class="nav-link">Inicio</a>
                        </li>
                        ${this.categories.map(cat => `
                            <li class="nav-item">
                                <a href="/src/views/pages/category/category.html?slug=${cat.slug}" class="nav-link">
                                    ${cat.name}
                                </a>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </nav>
            <div id="cart-products" class="cart-dropdown shadow-lg rounded-3" style="display: none;"></div>
        </div>
        `;
        this.renderCart();
    }

    renderCart() {
        const cart = CartManager.getCart();
        const container = document.getElementById("cart-products");
        const cartCount = document.getElementById("cart-count");

        if (!container) return;

        // Update badge
        if (cartCount) {
            const totalItems = cart.reduce((acc, p) => acc + p.quantity, 0);
            if (totalItems > 0) {
                cartCount.textContent = totalItems;
                cartCount.style.display = "block";
            } else {
                cartCount.style.display = "none";
            }
        }

        if (!this.isCartOpen) {
            container.style.display = "none";
            return;
        }

        container.style.display = "block";
        container.innerHTML = `
            <div class="p-3 black-background rounded-3">
                <h5 class="text-white">Tu Carrito</h5>
                ${cart.length === 0 ? '<p class="text-white text-center py-4">El carrito está vacío</p>' : `
                    <div class="cart-items-list" style="max-height: 400px; overflow-y: auto;">
                        ${cart.map(p => `
                            <div class="d-flex align-items-center mb-3 gap-3 border-bottom pb-2">
                                <img src="${p.img}" alt="${p.title}" style="width: 50px; height: 50px; object-fit: cover;" class="rounded">
                                <div class="flex-grow-1">
                                    <h6 class="text-white mb-0 small fw-bold">${p.title}</h6>
                                    <div class="d-flex justify-content-between align-items-center mt-1">
                                        <span class="text-white fw-bold">$${p.price}</span>
                                        <div class="d-flex align-items-center gap-2">
                                            <button class="btn btn-sm btn-outline-secondary py-0 px-2 minus-btn" data-id="${p.id}">-</button>
                                            <span class="text-white">${p.quantity}</span>
                                            <button class="btn btn-sm btn-outline-secondary py-0 px-2 plus-btn" data-id="${p.id}">+</button>
                                        </div>
                                    </div>
                                </div>
                                <button class="btn btn-sm text-danger remove-btn" data-id="${p.id}">
                                    <i></i>Eliminar
                                </button>
                            </div>
                        `).join('')}
                    </div>
                    <div class="mt-3 d-grid">
                        <div class="d-flex justify-content-between mb-3 fw-bold text-white">
                            <span>Total:</span>
                            <span>$${cart.reduce((acc, p) => acc + (parseFloat(p.price) * p.quantity), 0).toFixed(2)}</span>
                        </div>
                        <a href="/checkout" class="green-background p-2 rounded-2 text-white link-reset text-center">Ir a la pasarela</a>
                    </div>
                `}
            </div>
        `;
    }
}

customElements.define('navbar-component', Navbar);

