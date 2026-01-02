import { categories } from "@data/api/getCategory.js";
import { getData } from "@data/api/getAll.js";
import { createMensaggeWaiting, createErrorMessage, deleteMensaggeWaiting } from "@layouts/response.js";
import { HtmlPrint } from "@utils/htmlPrint.js";
import imageNotFound from "@assets/img/Image-not-found.png";
import platziBlackLogo from "@assets/logos/Icon-Platzi-Black.svg";

const heroSectionHTML = document.getElementById("hero");
if (heroSectionHTML) {
    const heroLogo = heroSectionHTML.querySelector("#hero-logo");
    if (heroLogo) heroLogo.src = platziBlackLogo;
}

//Gobal variables
const categorySection = document.getElementById("categorys");
const lastProductsSection = document.getElementById("posts");

// Add layout classes to existing sections (same behavior as before)
categorySection.classList.add("row", "justify-content-center", "g-3", "h-100", "w-100", "py-4", "py-md-5", "px-2", "px-md-5");
lastProductsSection.classList.add("row", "justify-content-center", "w-100", "py-4", "py-md-5", "px-2", "px-md-4", "last-products");


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
        divCategory.className = "col-12 col-md-6 col-lg-4 pb-3";
        divCategory.innerHTML = `
            <div class="black-background rounded-4 p-3 p-md-4 h-100">
                <div class="d-flex justify-content-between h-100 gap-2">
                    <div class="flex-grow-1 d-flex flex-column justify-content-between align-items-start text-start">
                        <h2 class="h3 text-white mb-2">${i.name}</h2>
                        <a class="button-reset button-s text-white p-2 rounded-2 green-background mt-2" href="/src/views/pages/category/category.html?slug=${i.slug}">Ver todos</a>
                    </div>
                    <img src="${i.image}" alt="${i.name}" class="category-card-img rounded-3 align-self-center"
                        onerror="this.onerror=null; this.src='${imageNotFound}';">
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
    row.className = "row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 col-12 col-md-11 col-lg-10";
    data.forEach((i) => {
        const productHTML = new HtmlPrint(i);
        row.appendChild(productHTML.render());
    });

    lastProductsSection.appendChild(row);
}

get3Products()

getCategorys();


