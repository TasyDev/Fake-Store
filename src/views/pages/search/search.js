import { getDataBySearch } from "../../../data/api/getByID.js";

function getTitleSearch() {
    const params = new URLSearchParams(window.location.search);
    return params.get("q");
}

const title = getTitleSearch();

if (title) {
    getDataBySearch(title);
} else {
    console.error("No hay title en la URL");
}

