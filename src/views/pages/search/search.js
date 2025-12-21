import { getDataBySearch } from "../../../data/api/getByID.js";
import { createErrorMessage, createMensaggeWaiting, deleteMensaggeWaiting } from "../../layouts/response.js";

async function getTheProductsBySearch(title) {
    const resultsSection = document.getElementById("results");
    createMensaggeWaiting(resultsSection);
    try {
        const productsArrays = await getDataBySearch(title);
        heroSection(title);
        printProducts(productsArrays);
    } catch (error) {
        deleteMensaggeWaiting(resultsSection);
        createErrorMessage(resultsSection, error);
    }
}

function heroSection(titleQuery) {
    const titleElement = document.getElementById("search-title");
    if (titleElement) {
        titleElement.textContent = `Resultados para: "${titleQuery}"`;
    }
}

function printProducts(data) {
    const print = document.getElementById("results");
    deleteMensaggeWaiting(print);

    let container = print.querySelector(".col-12.col-md-10");

    const row = document.createElement("div");
    row.className = "row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4";

    if (data.length === 0) {
        const noResults = document.createElement("h2");
        noResults.className = "text-white text-center w-100";
        noResults.textContent = "No se encontraron productos";
        container.appendChild(noResults);
        return;
    }

    data.forEach((i) => {
        const divProduct = document.createElement("div");
        divProduct.className = "col d-flex";
        divProduct.innerHTML = `
            <div class="black-background p-4 p-md-5 rounded-4 w-100 h-100 product-card" data-id="${i.id}">
                <img src="${i.images[0]}" alt="${i.title}" class="img-fluid w-100 pb-2"
                    onerror="this.onerror=null; this.src='/src/assets/img/Image-not-found.png';">
                <h3 class="text-white mb-1">
                    ${i.title}
                </h3> 
                <p class="text-white fs-4 fw-bold mb-2">$${i.price}</p>
                <p class="text-white opacity-75 small">${i.description}</p>
                <div class="d-flex justify-content-between align-items-center mt-3">
                    <a class="text-white">Comprar ahora</a>
                    <button class="add-to-cart-btn button-reset">
                        <img src="/src/assets/icons/bag-add.svg" alt="Agregar al carrito" class="green-background rounded-3 px-3" style="width: 65px;">
                    </button>
                </div>
            </div>
        `;
        row.appendChild(divProduct);
    });

    container.appendChild(row);
}

function getTitleSearch() {
    const params = new URLSearchParams(window.location.search);
    return params.get("q");
}

const title = getTitleSearch();

if (title) {
    getTheProductsBySearch(title);
} else {
    console.error("No hay title en la URL");
}
