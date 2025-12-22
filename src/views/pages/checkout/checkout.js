import { CartManager } from "../../../utils/cartManager.js";

function renderProducts(data) {
    const productsPrint = document.getElementById('products-list');
    const summaryPrint = document.getElementById('checkout-summary');
    if (!productsPrint) return;

    productsPrint.innerHTML = '';

    if (!data || data.length === 0) {
        productsPrint.innerHTML = '<p class="text-white">El carrito está vacío</p>';
        if (summaryPrint) summaryPrint.innerHTML = '';
        return;
    }

    data.forEach(item => {
        const insertHTML = `
        <div class="d-flex align-items-start mb-4 p-3 black-background rounded-4 text-white border border-secondary border-opacity-25 gap-2 gap-md-3">
            <img src="${item.img}" alt="${item.title}" class="rounded-3" style="width: 80px; height: 80px; object-fit: cover; flex-shrink: 0;">
            
            <div class="flex-grow-1 min-w-0">
                <h3 class="h6 mb-1 fw-bold text-wrap" style="font-size: 0.95rem;">${item.title}</h3>
                <p class="mb-2 fs-6 fw-bold green-pp">$${item.price}</p>
                
                <div class="d-flex align-items-center gap-3 bg-secondary bg-opacity-25 rounded-pill px-3 py-1 w-fit-content" style="width: fit-content;">
                    <button class="button-reset text-white minus-btn fs-5" data-id="${item.id}">-</button>
                    <span class="fw-bold" style="min-width: 20px; text-align: center;">${item.quantity || 1}</span>
                    <button class="button-reset text-white plus-btn fs-5" data-id="${item.id}">+</button>
                </div>
            </div>

            <div class="d-flex align-items-center h-100">
                <button class="btn btn-link btn-sm text-danger text-decoration-none remove-btn p-1" data-id="${item.id}">
                    <i class="bi bi-trash3 fs-5"></i>
                    <span class="d-none d-md-inline ms-1">Eliminar</span>
                </button>
            </div>
        </div>
        `;
        productsPrint.insertAdjacentHTML("beforeend", insertHTML);
    });

    if (summaryPrint) {
        const total = data.reduce((acc, item) => acc + (parseFloat(item.price) * (item.quantity || 1)), 0);
        summaryPrint.innerHTML = `
            <div class="black-background p-4 rounded-4 text-white border border-secondary border-opacity-25">
                <h2 class="h4 mb-4">Resumen de pedido</h2>
                
                <div class="mb-4">
                    ${data.map(item => `
                        <div class="d-flex justify-content-between mb-2 opacity-75 small font-monospace">
                            <span class="text-truncate me-2">${item.title}</span>
                            <span>${item.quantity || 1}</span>
                            <span>$${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                        </div>
                    `).join('')}
                </div>

                <div class="d-flex justify-content-between fw-bold fs-4 mt-4 pt-3 border-top border-secondary">
                    <span>Total:</span>
                    <span class="green-pp">$${total.toFixed(2)}</span>
                </div>
            </div>
        `;
    }

}


document.addEventListener('DOMContentLoaded', () => {
    const productsPrint = document.querySelector('.col-md-8');

    if (productsPrint) {
        productsPrint.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if (!btn) return;

            const id = btn.dataset.id;

            if (btn.classList.contains('remove-btn')) {
                CartManager.removeFromCart(id);
            } else if (btn.classList.contains('plus-btn')) {
                CartManager.updateQuantity(id, 1);
            } else if (btn.classList.contains('minus-btn')) {
                CartManager.updateQuantity(id, -1);
            }

            renderProducts(CartManager.getCart());
        });
    }

    renderProducts(CartManager.getCart());
});
