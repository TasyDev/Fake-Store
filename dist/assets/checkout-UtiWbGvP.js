import{C as a}from"./navbar-rk9b7t58.js";function r(n){const i=document.getElementById("products-list"),e=document.getElementById("checkout-summary");if(i){if(i.innerHTML="",!n||n.length===0){i.innerHTML='<p class="text-white">El carrito está vacío</p>',e&&(e.innerHTML="");return}if(n.forEach(t=>{const s=`
        <div class="d-flex align-items-start mb-4 p-3 black-background rounded-4 text-white border border-secondary border-opacity-25 gap-2 gap-md-3">
            <img src="${t.img}" alt="${t.title}" class="rounded-3" style="width: 80px; height: 80px; object-fit: cover; flex-shrink: 0;">
            
            <div class="flex-grow-1 min-w-0">
                <h3 class="h6 mb-1 fw-bold text-wrap" style="font-size: 0.95rem;">${t.title}</h3>
                <p class="mb-2 fs-6 fw-bold green-pp">$${t.price}</p>
                
                <div class="d-flex align-items-center gap-3 bg-secondary bg-opacity-25 rounded-pill px-3 py-1 w-fit-content" style="width: fit-content;">
                    <button class="button-reset text-white minus-btn fs-5" data-id="${t.id}">-</button>
                    <span class="fw-bold" style="min-width: 20px; text-align: center;">${t.quantity||1}</span>
                    <button class="button-reset text-white plus-btn fs-5" data-id="${t.id}">+</button>
                </div>
            </div>

            <div class="d-flex align-items-center h-100">
                <button class="btn btn-link btn-sm text-danger text-decoration-none remove-btn p-1" data-id="${t.id}">
                    <i class="bi bi-trash3 fs-5"></i>
                    <span class="d-none d-md-inline ms-1">Eliminar</span>
                </button>
            </div>
        </div>
        `;i.insertAdjacentHTML("beforeend",s)}),e){const t=n.reduce((s,o)=>s+parseFloat(o.price)*(o.quantity||1),0);e.innerHTML=`
            <div class="black-background p-4 rounded-4 text-white border border-secondary border-opacity-25">
                <h2 class="h4 mb-4">Resumen de pedido</h2>
                
                <div class="mb-4">
                    ${n.map(s=>`
                        <div class="d-flex justify-content-between mb-2 opacity-75 small font-monospace">
                            <span class="text-truncate me-2">${s.title}</span>
                            <span>${s.quantity||1}</span>
                            <span>$${(s.price*(s.quantity||1)).toFixed(2)}</span>
                        </div>
                    `).join("")}
                </div>

                <div class="d-flex justify-content-between fw-bold fs-4 mt-4 pt-3 border-top border-secondary">
                    <span>Total:</span>
                    <span class="green-pp">$${t.toFixed(2)}</span>
                </div>
            </div>
        `}}}document.addEventListener("DOMContentLoaded",()=>{const n=document.querySelector(".col-md-8");n&&n.addEventListener("click",i=>{const e=i.target.closest("button");if(!e)return;const t=e.dataset.id;e.classList.contains("remove-btn")?a.removeFromCart(t):e.classList.contains("plus-btn")?a.updateQuantity(t,1):e.classList.contains("minus-btn")&&a.updateQuantity(t,-1),r(a.getCart())}),r(a.getCart())});
