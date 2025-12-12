import { getData } from "../../../data/api/getAll.js";
import { categories } from "../../../data/api/getCategory.js";

const categorysDom = document.getElementById("categoryCards")

async function tryGetData() {

    function html(data) {
        return data.map(item => {
            return `<img src="${item.images}" alt="${item.slug}"/> <h1>${item.title}</h1>`;
        }).join('');
    }

    let saveData = [];
    try {
        const saveData = await getData();
        dom.innerHTML = html(saveData);
    } catch (error) {
        console.log(error);
    }
}

async function tryGetCategory() {
    try {
        const saveData = await categories();
        const sliceData = saveData.slice(0, 6);

        let rowsHtml = '';
        for (let i = 0; i < sliceData.length; i += 3) {
            const cards = sliceData.slice(i, i + 3).map(item => {
                return `
                <div class="col-md-4 pb-3">
                    <div class="black-background rounded-4 p-4 h-100">
                        <div class="d-flex justify-content-between align-items-start h-100">
                            <div class="flex-grow-1 p-3">
                                <h2 class="h2 text-white mb-3">${item.name}</h2>
                            </div>
                            <img src="${item.image}" alt="${item.slug}" class="flex-shrink-0 rounded-3" style="width:150px; height:150px; object-fit:cover;">
                        </div>
                    </div>
                </div>
                `;
            }).join('');
            rowsHtml += `<div class="row justify-content-center g-3">${cards}</div>`;
        }

        categorysDom.innerHTML = `<div class="col-md-10 p-5 rounded-4">${rowsHtml}</div>`;
    } catch (error) {
        console.log(error);
    }

    
}

document.addEventListener("DOMContentLoaded", () => {
    tryGetCategory();
});