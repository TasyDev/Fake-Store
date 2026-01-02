(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const t of a)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function r(a){const t={};return a.integrity&&(t.integrity=a.integrity),a.referrerPolicy&&(t.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?t.credentials="include":a.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(a){if(a.ep)return;a.ep=!0;const t=r(a);fetch(a.href,t)}})();const u={getCart(){return JSON.parse(localStorage.getItem("cart"))||[]},saveCart(n){localStorage.setItem("cart",JSON.stringify(n)),window.dispatchEvent(new CustomEvent("cart-updated",{detail:n}))},toggleProduct(n){let e=this.getCart();const r=e.findIndex(i=>i.id===n.id);r!==-1?e.splice(r,1):e.push({...n,quantity:1}),this.saveCart(e)},removeFromCart(n){let e=this.getCart();e=e.filter(r=>r.id!==n),this.saveCart(e)},updateQuantity(n,e){let r=this.getCart();const i=r.find(a=>a.id===n);i&&(i.quantity+=e,i.quantity<=0&&(r=r.filter(a=>a.id!==n)),this.saveCart(r))},isInCart(n){return this.getCart().some(r=>r.id===n)}};async function v(){const n=await fetch("https://api.escuelajs.co/api/v1/categories/?&limit=6&offset=6");if(!n.ok)throw new Error("Request failed");return await n.json()}const b="/assets/Icon-Platzi-Black-B_YMlhFf.svg",p="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAYCAYAAAARfGZ1AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEqSURBVHgBxZXtcYMwDIblXv+XDeoR6AaMwAiMkA3ICp2g3aDdIGSCkAnIBrCBIievE87nDwLk8tzpDEh6LX9ClICZC7E/sZ6v9HgvaAkiUPOdVqxBa6lpDiPhg1ulvGuxblYHSGYIZIGYbNSBpqlI8BZJVSKuQtzW538L5OVoG4pj/Z8+5zsq0M73D7RmeiiCtsU4GoNSanB3xJrUihOlLSE0563YN03DxDVeT2BIBXynxNA7xJU+Z6hyTSsQErcHp6M4R4oVExjuDr6c42jEdT4nRRI3SCw9yeZmLOHfhARi4jeBUScV2mz0rZ8jbvkRy52pNHf8byrxkUM0wDK6L3iUl5zQ1cQHehJGvKXnsFfYCebQTFqkiZjZ+Lo88fWf+c/LMXu+sVv3DL2Z67LrPBKnAAAAAElFTkSuQmCC",f="/assets/greenlogo-229uq_vP.png";class m extends HTMLElement{constructor(){super(),this.categories=[],this.isCartOpen=!1}async connectedCallback(){try{this.categories=await v(),this.render(),this.setupEventListeners()}catch(e){console.error("Error fetching categories for navbar:",e),this.render(),this.setupEventListeners()}window.addEventListener("cart-updated",()=>{this.renderCart()})}setupEventListeners(){const e=this.querySelector("#nav-search"),r=this.querySelector("#nav-search-mobile"),i=s=>{s.trim()&&(window.location.href=`/src/views/pages/search/search.html?q=${encodeURIComponent(s.trim())}`)};e&&e.addEventListener("keypress",s=>{s.key==="Enter"&&i(s.target.value)}),r&&r.addEventListener("keypress",s=>{s.key==="Enter"&&i(s.target.value)}),this.querySelectorAll('label[for^="nav-search"]').forEach(s=>{s.addEventListener("click",()=>{const l=this.querySelector(`#${s.getAttribute("for")}`);l&&i(l.value)})});const a=this.querySelector("#store-card"),t=this.querySelector("#store-card-mobile"),o=()=>{this.isCartOpen=!this.isCartOpen,this.renderCart()};a&&a.addEventListener("click",o),t&&t.addEventListener("click",o),document.addEventListener("click",s=>{const l=s.target.closest(".add-to-cart-btn");if(!l)return;const c=l.closest(".product-card");if(!c)return;const d={id:c.dataset.id,title:c.querySelector("h3").textContent.trim(),price:c.querySelector(".fs-4").textContent.trim().replace("$",""),img:c.querySelector("img").src};u.toggleProduct(d),this.isCartOpen||(this.isCartOpen=!0,this.renderCart())}),document.addEventListener("click",s=>{const l=s.target.closest(".remove-btn");if(l){u.removeFromCart(l.dataset.id);return}const c=s.target.closest(".plus-btn");if(c){u.updateQuantity(c.dataset.id,1);return}const d=s.target.closest(".minus-btn");if(d){u.updateQuantity(d.dataset.id,-1);return}}),document.addEventListener("click",s=>{const l=document.getElementById("cart-products"),c=document.getElementById("store-card"),d=document.getElementById("store-card-mobile"),g=s.target.closest(".add-to-cart-btn");if(c&&c.contains(s.target)||d&&d.contains(s.target)||g)return;const h=s.target.closest(".cart-dropdown")||s.target.closest(".remove-btn")||s.target.closest(".plus-btn")||s.target.closest(".minus-btn");this.isCartOpen&&l&&!h&&(this.isCartOpen=!1,this.renderCart())})}render(){this.innerHTML=`
        <div class="navbar-container sticky-top shadow-sm" style="z-index: 1060;">
            <!-- Mobile/Tablet Navbar (Logo, Hamburger, Cart) -->
            <nav class="navbar navbar-dark black-background d-md-none px-3 py-2 navbar-mobile-top">
                <div class="d-flex align-items-center justify-content-between nav-row-1">
                    <div class="d-flex align-items-center gap-2">
                        <button class="navbar-toggler border-0 p-0" type="button" data-bs-toggle="collapse" data-bs-target="#categoriesMenu" aria-controls="categoriesMenu" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon" style="width: 24px; height: 24px;"></span>
                        </button>
                        <a href="/" class="d-flex align-items-center">
                            <img src="${b}" alt="Platzi Logo" class="green-background rounded-1" style="height: 24px; padding: 2px;">
                        </a>
                    </div>

                    <div>
                        <button id="store-card-mobile" class="button-reset position-relative d-flex align-items-center justify-content-center border border-white rounded-circle" style="width: 32px; height: 32px;">
                            <img src="${p}" alt="Carrito" style="height: 16px; width: 16px; object-fit: contain;">
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
                            <img src="${f}" alt="Platzi Logo" style="height: 32px;">
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
                            <img src="${p}" alt="Carrito" style="height: 20px; width: 20px; object-fit: contain;">
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
                        ${this.categories.map(e=>`
                            <li class="nav-item">
                                <a href="/src/views/pages/category/category.html?slug=${e.slug}" class="nav-link">
                                    ${e.name}
                                </a>
                            </li>
                        `).join("")}
                    </ul>
                </div>
            </nav>
            <div id="cart-products" class="cart-dropdown shadow-lg rounded-3" style="display: none;"></div>
        </div>
        `,this.renderCart()}renderCart(){const e=u.getCart(),r=document.getElementById("cart-products"),i=document.querySelectorAll(".cart-count-badge");if(!r)return;const a=e.reduce((t,o)=>t+o.quantity,0);if(i.forEach(t=>{a>0?(t.textContent=a,t.style.display="block"):t.style.display="none"}),!this.isCartOpen){r.style.display="none";return}r.style.display="block",r.innerHTML=`
            <div class="p-3 black-background rounded-3">
                <h5 class="text-white">Tu Carrito</h5>
                ${e.length===0?'<p class="text-white text-center py-4">El carrito está vacío</p>':`
                    <div class="cart-items-list" style="max-height: 400px; overflow-y: auto;">
                        ${e.map(t=>`
                            <div class="d-flex align-items-center mb-3 gap-3 border-bottom pb-2">
                                <img src="${t.img}" alt="${t.title}" style="width: 50px; height: 50px; object-fit: cover;" class="rounded">
                                <div class="flex-grow-1">
                                    <h6 class="text-white mb-0 small fw-bold">${t.title}</h6>
                                    <div class="d-flex justify-content-between align-items-center mt-1">
                                        <span class="text-white fw-bold">$${t.price}</span>
                                        <div class="d-flex align-items-center gap-2">
                                            <button class="btn btn-sm btn-outline-secondary py-0 px-2 minus-btn" data-id="${t.id}">-</button>
                                            <span class="text-white">${t.quantity}</span>
                                            <button class="btn btn-sm btn-outline-secondary py-0 px-2 plus-btn" data-id="${t.id}">+</button>
                                        </div>
                                    </div>
                                </div>
                                <button class="btn btn-sm text-danger remove-btn" data-id="${t.id}">
                                    <i></i>Eliminar
                                </button>
                            </div>
                        `).join("")}
                    </div>
                    <div class="mt-3 d-grid">
                        <div class="d-flex justify-content-between mb-3 fw-bold text-white">
                            <span>Total:</span>
                            <span>$${e.reduce((t,o)=>t+parseFloat(o.price)*o.quantity,0).toFixed(2)}</span>
                        </div>
                        <a href="/src/views/pages/checkout/checkout.html" class="green-background p-2 rounded-2 text-white link-reset text-center">Ir a la pasarela</a>
                    </div>
                `}
            </div>
        `}}customElements.define("navbar-component",m);export{u as C,v as c,b as p};
