import { getDataByCategory } from "../../../data/api/getAll.js";

function heroSection(data) {
    const title = document.getElementById("title-cover-category")
    const img = document.getElementById("img-cover-category")
    
    // Obtener la categoría del primer producto
    const category = data[0].category;
    
    // Manejo de error para la imagen: si no carga, mostrar imagen por defecto
    img.onerror = () => {
        img.src = "/src/assets/img/Image-not-found.png";
    };
    
    // Asignar la imagen de la categoría
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
    try {
        const productsArrays = await getDataByCategory(slug);
        heroSection(productsArrays)
    } catch (error) {
        console.log(error);
    }
}

getTheProductsByCategory("electronics");