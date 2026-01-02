import { getDataByCategory } from "../../../data/api/getAll.js";
import { createErrorMessage, createMensaggeWaiting, deleteMensaggeWaiting } from "../../layouts/response.js";
import { ProductPrinter } from "../../../utils/ProductPrinter.js";

function heroSection(data) {
    const title = document.getElementById("title-cover-category")
    const img = document.getElementById("img-cover-category")

    // Obtener la categoría del primer producto
    const category = data[0].category;

    // Asignar la imagen de la categoría y manejo de error
    img.setAttribute("onerror", "this.onerror=null; this.src='/src/assets/img/Image-not-found.png';");
    img.src = category.image;

    // Manejo de error para el título: si no existe, no hacer cambios al DOM
    try {

        if (category && category.name) {
            title.textContent = category.name;
        }
    } catch (error) {
        console.error("Error al actualizar el título:", error);
    }
}

// Variable global para almacenar los productos y no tener que refetchear al filtrar
let allProducts = [];

function handleFilter() {
    const filterInput = document.getElementById("filter-input");
    if (!filterInput) return;

    const filter = filterInput.value;
    let sortedProducts = [...allProducts]; // Clonar el array para no mutar el original

    if (filter === "Mayor") {
        sortedProducts.sort((a, b) => b.price - a.price);
    } else if (filter === "Menor") {
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (filter === "") {
        sortedProducts = [...allProducts];
    }

    printProducts(sortedProducts);
}

// Agregar el event listener al select de filtrado
document.addEventListener("DOMContentLoaded", () => {
    const filterInput = document.getElementById("filter-input");
    if (filterInput) {
        filterInput.addEventListener("change", handleFilter);
    }
});

async function getTheProductsByCategory(slug) {
    const postsSection = document.getElementById("posts");
    createMensaggeWaiting(postsSection);
    try {
        allProducts = await getDataByCategory(slug);
        heroSection(allProducts);
        printProducts(allProducts);
    } catch (error) {
        deleteMensaggeWaiting(postsSection);
        createErrorMessage(postsSection, error);
    }
}

function printProducts(data) {
    const print = document.getElementById("posts");
    const printer = new ProductPrinter(print);

    deleteMensaggeWaiting(print);
    // Obtener el contenedor col-12 col-md-10 que ya existe en el HTML
    const container = print.querySelector(".col-12.col-md-10");

    // Limpiar filas anteriores si existen (excepto el título y el input)
    const existingRow = container.querySelector(".row-products");
    if (existingRow) {
        existingRow.remove();
    }
    printer.print(data)
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