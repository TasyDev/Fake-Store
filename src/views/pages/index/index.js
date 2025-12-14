import { categories } from "../../../data/api/getCategory.js";

const heroSectionHTML = document.getElementById("hero");

//Gobal variables
const categorySection = document.createElement("section");
const lastProductsSection = document.createElement("section");

//HTML inyection
categorySection.className = "row justify-content-center h-100 w-100 py-5";
heroSectionHTML.after(categorySection);  
lastProductsSection.className = "last-products";
categorySection.after(lastProductsSection);



