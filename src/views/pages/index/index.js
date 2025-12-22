import { categories } from "../../../data/api/getCategory.js";
import { getData } from "../../../data/api/getAll.js";
import { createMensaggeWaiting, createErrorMessage, deleteMensaggeWaiting } from "../../layouts/response.js";

const heroSectionHTML = document.getElementById("hero");

//Gobal variables
const categorySection = document.getElementById("categorys");
const lastProductsSection = document.getElementById("posts");

// Add layout classes to existing sections (same behavior as before)
categorySection.classList.add("row", "justify-content-center", "g-3", "h-100", "w-100", "py-5", "px-5");
lastProductsSection.classList.add("row", "justify-content-center", "w-100", "py-5", "px-4", "last-products");


async function getCategorys() {
    createMensaggeWaiting(categorySection)
    try {
        const categoryArray = await categories();
        printCategory(categoryArray);
    } catch (error) {
        deleteMensaggeWaiting(categorySection);
        createErrorMessage(categorySection, error);
    }
}


function printCategory(data) {
    deleteMensaggeWaiting(categorySection)
    data.forEach((i) => {
        const divCategory = document.createElement("div");
        divCategory.className = "col-md-4 pb-3";
        divCategory.innerHTML = `
            <div class="black-background rounded-4 p-4 h-100">
                <div class="d-flex justify-content-between h-100">
                    <div class="flex-grow-1 p-3 d-flex flex-column justify-content-between align-items-start">
                        <h2 class="h2 text-white mb-3">${i.name}</h2>
                        <a class="button-reset button-l text-white p-2 rounded-2 green-background mt-3" href="/src/views/pages/category/category.html?slug=${i.slug}">Ver todos</a>
                    </div>
                    <img src="${i.image}" alt="${i.name}" class="flex-shrink-0 rounded-3 align-self-start" style="width:150px; height:150px; object-fit:cover;"
                        onerror="this.onerror=null; this.src='src/assets/img/Image-not-found.png';">
                </div>
            </div>
        `;
        categorySection.appendChild(divCategory);
    })
}

async function get3Products() {
    createMensaggeWaiting(lastProductsSection)
    try {
        const productsArray = await getData();
        printProduts(productsArray);
    } catch (error) {
        deleteMensaggeWaiting(lastProductsSection);
        createErrorMessage(lastProductsSection, error);
    }
}

function printProduts(data) {
    deleteMensaggeWaiting(lastProductsSection);
    const row = document.createElement("div");
    row.className = "row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 col-12 col-md-10";
    data.forEach((i) => {
        const divProduct = document.createElement("div");
        divProduct.className = "col d-flex";
        divProduct.innerHTML = `
            <div class="black-background p-4 p-md-5 rounded-4 w-100 h-100 product-card" data-id="${i.id}">
                <img src="${i.images[0]}" alt="${i.title}" class="img-fluid w-100 pb-2"
                    onerror="this.onerror=null; this.src='src/assets/img/Image-not-found.png';">
                <h3 class="text-white mb-1">
                    ${i.title}
                </h3> 
                <p class="text-white fs-4 fw-bold mb-2">$${i.price}</p>
                <p class="text-white opacity-75 small">${i.description}</p>
                <div class="d-flex justify-content-between align-items-center mt-3">
                    <a class="text-white">Comprar ahora</a>
                    <button class="add-to-cart-btn button-reset">
                        <img src="src/assets/icons/bag-add.svg" alt="Agregar al carrito" class="green-background rounded-3 px-3" style="width: 65px;">
                    </button>
                </div>
            </div>
        `;
        row.appendChild(divProduct);
    });

    lastProductsSection.appendChild(row);
}

get3Products()

getCategorys();


