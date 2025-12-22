const productsPrint = document.querySelector('.col-md-8');

document.addEventListener('DOMContentLoaded', () => {
    const data = JSON.parse(localStorage.getItem('cart')) || [];
    renderProducts(data);
});

function renderProducts(data) {
    productsPrint.innerHTML = '';

    if (data.length === 0) {
        productsPrint.innerHTML = '<p class="text-white">El carrito está vacío</p>';
        return;
    }

    data.forEach(item => {
        const insertHTML = `
        <div class="d-flex align-items-center mb-3 p-3 bg-dark rounded-4 text-white">
            <img src="${item.img}" alt="${item.title}" class="rounded-3 me-3" style="width: 80px; height: 80px; object-fit: cover;">
            <div class="flex-grow-1">
                <h3 class="h5 mb-1">${item.title}</h3>
                <p class="mb-0 opacity-75">$${item.price}</p>
            </div>
            <div class="d-flex align-items-center gap-2">
                <button class="btn btn-sm btn-danger">Eliminar</button>
                <div class="d-flex align-items-center gap-2 bg-secondary rounded-pill px-2">
                    <button class="btn btn-sm text-white">-</button>
                    <span>${item.quantity || 1}</span>
                    <button class="btn btn-sm text-white">+</button>
                </div>
            </div>
        </div>
        `;
        productsPrint.insertAdjacentHTML("beforeend", insertHTML);
    });
}
