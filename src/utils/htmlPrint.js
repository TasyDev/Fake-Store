export class HtmlPrint {
    constructor(data) {
        this.id = data.id; // <- guardar id
        this.title = data.title;
        this.img = data.images[0];
        this.price = data.price;
        this.dec = data.description;
    }

    render() {
        const divProduct = document.createElement("div");
        divProduct.className = "col d-flex";
        divProduct.innerHTML = `
            <div class="black-background p-4 p-md-5 rounded-4 w-100 h-100 product-card" data-id="${this.id}">
                <img src="${this.img}" alt="${this.title}" class="img-fluid w-100 pb-2"
                    onerror="this.onerror=null; this.src='/src/assets/img/Image-not-found.png';">
                <h3 class="text-white mb-1">${this.title}</h3> 
                <p class="text-white fs-4 fw-bold mb-2">$${this.price}</p>
                <p class="text-white opacity-75 small">${this.dec}</p>
                <div class="d-flex justify-content-between align-items-center mt-3">
                    <a class="text-white buy-now-btn" style="cursor: pointer;">Comprar ahora</a>
                    <button class="add-to-cart-btn button-reset">
                        <img src="/src/assets/icons/bag-add.svg" alt="Agregar al carrito" class="green-background rounded-3 px-3" style="width: 65px;">
                    </button>
                </div>
            </div>
        `;
        return divProduct; // devuelve un nodo listo para appendChild
    }
}
