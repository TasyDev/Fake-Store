import { categories } from "../../data/api/getCategory.js";

class Navbar extends HTMLElement {
    constructor() {
        super();
        this.categories = [];
    }

    async connectedCallback() {
        try {
            this.categories = await categories();
            this.render();
        } catch (error) {
            console.error("Error fetching categories for navbar:", error);
            this.render();
        }
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
                        <input id="nav-search-mobile" type="text" class="form-control nav-search-input" style="height: 32px; font-size: 12px;" placeholder="Placeholder">
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
                                <input id="nav-search" type="text" class="form-control nav-search-input" placeholder="Placeholder">
                            </div>
                        </div>
                    </div>

                    <div class="d-flex align-items-center gap-2">
                        <button class="btn green-background text-black fw-bold btn-sm d-none d-lg-block px-3 py-1 transition-all hover-opacity">
                            Iniciar Sesión
                        </button>

                        <a href="#" class="nav-icon-circle p-1" title="Iniciar Sesión">
                            <img src="/src/assets/icons/carrito.png" alt="Iniciar Sesión" style="height: 18px; object-fit: contain;">
                        </a>

                        <a href="#" class="nav-icon-circle p-1 d-none d-md-flex">
                            <img src="/src/assets/icons/carrito.png" alt="Carrito" style="height: 18px; object-fit: contain;">
                        </a>
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
        </div>
        `;

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
    }
}



customElements.define('navbar-component', Navbar);