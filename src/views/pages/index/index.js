import { categories } from "../../../data/api/getCategory.js";

const heroSectionHTML = document.getElementById("hero");

//Gobal variables
const categorySection = document.createElement("section");
const lastProductsSection = document.createElement("section");

//HTML inyection
categorySection.className = "row justify-content-center g-3 h-100 w-100 py-5 px-5";
heroSectionHTML.after(categorySection);  
lastProductsSection.className = "last-products";
categorySection.after(lastProductsSection);

function mensaggeWaiting() {
    const loadingMessage = document.createElement("h2");
    loadingMessage.className = "text-white text-center w-100";
    loadingMessage.textContent = "Cargando...";
    categorySection.appendChild(loadingMessage);
}

async function getCategorys() {
    mensaggeWaiting()
    const categoryArray = await categories();
    printCategory(categoryArray);
}

function printCategory(data){
    const loadingMessage = categorySection.querySelector('h2');
    loadingMessage.remove();
    
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

getCategorys();


