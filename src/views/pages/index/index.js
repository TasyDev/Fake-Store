import { categories } from "../../../data/api/getCategory.js";
import { getData } from "../../../data/api/getAll.js";

const heroSectionHTML = document.getElementById("hero");

//Gobal variables
const categorySection = document.createElement("section");
const lastProductsSection = document.createElement("section");

//HTML inyection
categorySection.className = "row justify-content-center g-3 h-100 w-100 py-5 px-5";
heroSectionHTML.after(categorySection);  
// Sección de últimos productos con padding horizontal para que no quede pegada a los bordes
lastProductsSection.className = "row justify-content-center w-100 py-5 px-4 last-products";
categorySection.after(lastProductsSection);

function createMensaggeWaiting(idSection) {
    const createLoadingMessage = document.createElement("h2");
    createLoadingMessage.className = "text-white text-center w-100";
    createLoadingMessage.textContent = "Cargando...";
    idSection.appendChild(createLoadingMessage);
}

function deleteMensaggeWaiting(idSection) {
    const loadingMessage = idSection.querySelector("h2");
    if (loadingMessage) {
        loadingMessage.remove();
    }
}

async function getCategorys() {
    createMensaggeWaiting(categorySection)
    const categoryArray = await categories();
    printCategory(categoryArray);
}


function printCategory(data){
    deleteMensaggeWaiting(categorySection)
    data.map((i) =>{
        const divCategory = document.createElement("div");
        divCategory.className = "col-md-4 pb-3";
        divCategory.innerHTML = `
            <div class="black-background rounded-4 p-4 h-100">
                <div class="d-flex justify-content-between align-items-start h-100">
                    <div class="flex-grow-1 p-3">
                        <h2 class="h2 text-white mb-3">${i.name}</h2>
                    </div>
                    <img src=${i.image} alt=${i.name} class="flex-shrink-0 rounded-3" style="width:150px; height:150px; object-fit:cover;">
                </div>
            </div>
        `;
        categorySection.appendChild(divCategory);
    })
}

async function get3Products() {
    createMensaggeWaiting(lastProductsSection)
    const productsArray = await getData();
    printProduts(productsArray);
}

function printProduts(data){
    deleteMensaggeWaiting(lastProductsSection);
    const row = document.createElement("div");
    row.className = "row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 col-12 col-md-10";
    data.map((i) => {
        const divProduct = document.createElement("div");
        divProduct.className = "col d-flex";
        divProduct.innerHTML = `
            <div class="black-background p-4 p-md-5 rounded-4 w-100 h-100">
                <img src="${i.images}" alt="${i.title}" class="img-fluid w-100 pb-2">
                <h3 class="text-white">
                    ${i.title}
                </h3> 
                <p class="text-white">${i.description}</p>
                <div class="d-flex justify-content-between align-items-center mt-3">
                    <a class="text-white">Comprar ahora</a>
                    <a>
                        <img src="src/assets/icons/bag-add.svg" alt="Agregar al carrito" class="green-background rounded-3 px-3" style="width: 65px;">
                    </a>
                </div>
            </div>
        `;
        row.appendChild(divProduct);
    });

    lastProductsSection.appendChild(row);
}

get3Products()

getCategorys();


