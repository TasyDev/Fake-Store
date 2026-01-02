import { getDataBySearch } from "../../../data/api/getByID.js";
import { createErrorMessage, createMensaggeWaiting, deleteMensaggeWaiting } from "../../layouts/response.js";
import {HtmlPrint} from "../../../utils/htmlPrint.js";

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
        const productHTML = new HtmlPrint(i);
        row.appendChild(productHTML.render());
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
