import { getDataByCategory } from "../../../data/api/getAll.js";
import { createErrorMessage, createMensaggeWaiting, deleteMensaggeWaiting } from "../../layouts/response.js";

function heroSection(data) {
    const title = document.getElementById("title-cover-category")
    const img = document.getElementById("img-cover-category")

    // Obtener la categoría del primer producto
    const category = data[0].category;

    // Asignar la imagen de la categoría y manejo de error
    img.setAttribute("onerror", "this.onerror=null; this.src='src/assets/img/Image-not-found.png';");
    img.src = category.images;

    // Manejo de error para el título: si no existe, no hacer cambios al DOM
    try {

        if (category && category.name) {
            title.textContent = category.name;
        }
    } catch (error) {
        console.error("Error al actualizar el título:", error);
    }
}

async function getTheProductsByCategory(slug) {
    const postsSection = document.getElementById("posts");
    createMensaggeWaiting(postsSection);
    try {
        const productsArrays = await getDataByCategory(slug);
        heroSection(productsArrays)
        printProducts(productsArrays)
    } catch (error) {
        deleteMensaggeWaiting(postsSection);
        createErrorMessage(postsSection, error);
    }
}

function printProducts(data) {
    const print = document.getElementById("posts");
    deleteMensaggeWaiting(print);
    // Obtener el contenedor col-12 col-md-10 que ya existe en el HTML
    const container = print.querySelector(".col-12.col-md-10");

    const row = document.createElement("div");
    row.className = "row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4";
    data.forEach((i) => {
        const divProduct = document.createElement("div");
        divProduct.className = "col d-flex";
        divProduct.innerHTML = `
            <div class="black-background p-4 p-md-5 rounded-4 w-100 h-100">
                <img src="${i.imagen}" alt="${i.title}" class="img-fluid w-100 pb-2"
                    onerror="this.onerror=null; this.src='src/assets/img/Image-not-found.png';">
                <h3 class="text-white">
                    ${i.title}
                </h3> 
                <p class="text-white">${i.description}</p>
                <div class="d-flex justify-content-between align-items-center mt-3">
                    <a class="text-white">Comprar ahora</a>
                    <a>
                        <img src="/src/assets/icons/bag-add.svg" alt="Agregar al carrito" class="green-background rounded-3 px-3" style="width: 65px;">
                    </a>
                </div>
            </div>
        `;
        row.appendChild(divProduct);
    });

    container.appendChild(row);
}

function getSlugFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("slug");
}

const slug = getSlugFromURL();

if (slug) {
    getTheProductsByCategory(slug);
} else {
    console.error("No hay slug en la URL");
}