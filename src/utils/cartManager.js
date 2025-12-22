export const CartManager = {
    getCart() {
        return JSON.parse(localStorage.getItem('cart')) || [];
    },

    saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
        window.dispatchEvent(new CustomEvent('cart-updated', { detail: cart }));
    },

    toggleProduct(product) {
        let cart = this.getCart();
        const index = cart.findIndex(p => p.id === product.id);

        if (index !== -1) {
            // If it exists, remove it
            cart.splice(index, 1);
        } else {
            // If it doesn't exist, add it
            cart.push({
                ...product,
                quantity: 1
            });
        }

        this.saveCart(cart);
    },

    removeFromCart(id) {
        let cart = this.getCart();
        cart = cart.filter(p => p.id !== id);
        this.saveCart(cart);
    },

    updateQuantity(id, delta) {
        let cart = this.getCart();
        const product = cart.find(p => p.id === id);
        if (product) {
            product.quantity += delta;
            if (product.quantity <= 0) {
                cart = cart.filter(p => p.id !== id);
            }
            this.saveCart(cart);
        }
    },

    isInCart(id) {
        const cart = this.getCart();
        return cart.some(p => p.id === id);
    }
};
