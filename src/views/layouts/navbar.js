import { categories } from "@data/api/getCategory.js";
import { CartManager } from "@utils/cartManager.js";
import platziBlackLogo from "@assets/logos/Icon-Platzi-Black.svg";
import carritoIcon from "@assets/icons/carrito.png";
import greenLogo from "@assets/logos/greenlogo.png";

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
        const storeButtonMobile = this.querySelector("#store-card-mobile");

        const toggleCart = () => {
            this.isCartOpen = !this.isCartOpen;
            this.renderCart();
        };

        if (storeButton) storeButton.addEventListener('click', toggleCart);
        if (storeButtonMobile) storeButtonMobile.addEventListener('click', toggleCart);

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
            const storeButtonMobile = document.getElementById("store-card-mobile");
            const addToCartBtn = e.target.closest(".add-to-cart-btn");

            // If the click is on the store buttons, it's handled by its own listener
            if (storeButton && storeButton.contains(e.target)) return;
            if (storeButtonMobile && storeButtonMobile.contains(e.target)) return;

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
            <!-- Mobile/Tablet Navbar (Logo, Hamburger, Cart) -->
            <nav class="navbar navbar-dark black-background d-md-none px-3 py-2 navbar-mobile-top">
                <div class="d-flex align-items-center justify-content-between nav-row-1">
                    <div class="d-flex align-items-center gap-2">
                        <button class="navbar-toggler border-0 p-0" type="button" data-bs-toggle="collapse" data-bs-target="#categoriesMenu" aria-controls="categoriesMenu" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon" style="width: 24px; height: 24px;"></span>
                        </button>
                        <a href="/" class="d-flex align-items-center">
                            <img src="${platziBlackLogo}" alt="Platzi Logo" class="green-background rounded-1" style="height: 24px; padding: 2px;">
                        </a>
                    </div>

                    <div>
                        <button id="store-card-mobile" class="button-reset position-relative d-flex align-items-center justify-content-center border border-white rounded-circle" style="width: 32px; height: 32px;">
                            <img src="${carritoIcon}" alt="Carrito" style="height: 16px; width: 16px; object-fit: contain;">
                            <span class="cart-count-badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style="font-size: 8px; display: none;">
                                0
                            </span>
                        </button>
                    </div>
                </div>
                <!-- Search Row on Mobile -->
                <div class="d-flex gap-2 nav-row-2">
                    <label for="nav-search-mobile" class="green-action-btn transition-all mb-0 px-2" style="cursor: pointer; height: 32px; font-size: 12px;">
                        <span>Buscar</span>
                    </label>
                    <div class="flex-grow-1">
                        <input id="nav-search-mobile" type="text" class="form-control nav-search-input" style="height: 32px; font-size: 12px;" placeholder="Buscar productos...">
                    </div>
                </div>
            </nav>

            <!-- Desktop Navbar -->
            <nav class="navbar navbar-dark navbar-top black-background d-none d-md-flex px-4 py-1">
                <div class="d-flex align-items-center justify-content-between h-100 mx-auto w-100" style="max-width: 1200px;">
                    
                    <div class="d-flex align-items-center gap-4">
                        <a href="/" class="d-flex align-items-center">
                            <img src="${greenLogo}" alt="Platzi Logo" style="height: 32px;">
                        </a>

                        <div class="d-flex align-items-center gap-2">
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
                            <img src="${carritoIcon}" alt="Carrito" style="height: 20px; width: 20px; object-fit: contain;">
                            <span class="cart-count-badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style="font-size: 10px; display: none;">
                                0
                            </span>
                        </button>
                    </div>
                </div>
            </nav>

            <!-- Categories Bottom Bar -->
            <nav class="navbar navbar-expand-md navbar-dark navbar-bottom py-1">
                <div class="collapse navbar-collapse" id="categoriesMenu">
                    <ul class="navbar-nav justify-content-center gap-3 gap-md-4 m-0 p-0 w-100 text-center py-2 py-md-0">
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
        const cartCountBadges = document.querySelectorAll(".cart-count-badge");

        if (!container) return;

        // Update badges
        const totalItems = cart.reduce((acc, p) => acc + p.quantity, 0);
        cartCountBadges.forEach(badge => {
            if (totalItems > 0) {
                badge.textContent = totalItems;
                badge.style.display = "block";
            } else {
                badge.style.display = "none";
            }
        });

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
                        <a href="/src/views/pages/checkout/checkout.html" class="green-background p-2 rounded-2 text-white link-reset text-center">Ir a la pasarela</a>
                    </div>
                `}
            </div>
        `;
    }
}

customElements.define('navbar-component', Navbar);

