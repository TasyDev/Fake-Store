import { CartManager } from "./cartManager.js";

document.addEventListener('click', (e) => {
    const button = e.target.closest('.buy-now-btn');

    if (button) {
        const card = button.closest('.product-card');

        const product = {
            id: card.dataset.id,
            title: card.querySelector('h3').textContent.trim(),
            price: card.querySelector('.fs-4').textContent.trim().replace('$', ''),
            img: card.querySelector('img').src
        };

        if (!CartManager.isInCart(product.id)) {
            CartManager.toggleProduct(product);
        }

        window.location.href = "/src/views/pages/checkout/checkout.html";
    }
});
