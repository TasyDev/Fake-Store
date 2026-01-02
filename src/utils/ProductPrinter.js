export class ProductPrinter {
    constructor(containerId) {
        this.containerElement = document.getElementById(containerId).querySelector(".col-12.col-md-10");
    }

    print(data) {
        // Limpiar filas anteriores si existen (excepto el título y el input)
        const existingRow = this.containerElement.querySelector(".row-products");
        if (existingRow) {
            existingRow.remove();
        }

        const row = document.createElement("div");
        row.className = "row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 row-products";

        data.forEach(product => {
            const divProduct = document.createElement("div");
            divProduct.className = "col d-flex";
            divProduct.innerHTML = `
                <div class="black-background p-4 p-md-5 rounded-4 w-100 h-100 product-card" data-id="${product.id}">
                    <img src="${product.images[0]}" alt="${product.title}" class="img-fluid w-100 pb-2"
                        onerror="this.onerror=null; this.src='/src/assets/img/Image-not-found.png';">
                    <h3 class="text-white mb-1">${product.title}</h3> 
                    <p class="text-white fs-4 fw-bold mb-2">$${product.price}</p>
                    <p class="text-white opacity-75 small">${product.description}</p>
                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <a class="text-white buy-now-btn" style="cursor: pointer;">Comprar ahora</a>
                        <button class="add-to-cart-btn button-reset">
                            <img src="/src/assets/icons/bag-add.svg" alt="Agregar al carrito" class="green-background rounded-3 px-3" style="width: 65px;">
                        </button>
                    </div>
                </div>
            `;
            row.appendChild(divProduct);
        });

        this.containerElement.appendChild(row);
    }
}