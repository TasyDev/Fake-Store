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
        <div class="d-flex align-items-center mb-4 p-3 black-background rounded-4 text-white border border-secondary border-opacity-25">
            <img src="${item.img}" alt="${item.title}" class="rounded-3 me-3" style="width: 100px; height: 100px; object-fit: cover;">
            <div class="flex-grow-1">
                <h3 class="h5 mb-1 text-truncate" style="max-width: 250px;">${item.title}</h3>
                <p class="mb-0 fs-5 fw-bold green-pp">$${item.price}</p>
            </div>
            <div class="d-flex flex-column align-items-end gap-2">
                <div class="d-flex align-items-center gap-3 bg-secondary bg-opacity-25 rounded-pill px-3 py-1">
                    <button class="button-reset text-white minus-btn fs-5" data-id="${item.id}">-</button>
                    <span class="fw-bold" style="min-width: 20px; text-align: center;">${item.quantity || 1}</span>
                    <button class="button-reset text-white plus-btn fs-5" data-id="${item.id}">+</button>
                </div>
                <button class="btn btn-link btn-sm text-danger text-decoration-none remove-btn p-0" data-id="${item.id}">
                    Eliminar
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
                            <span class="text-truncate me-2" style="max-width: 150px;">${item.title}</span>
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
