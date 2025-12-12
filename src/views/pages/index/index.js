import { getData } from "../../../data/api/getAll.js";

const dom = document.getElementById("Try")

async function tryGetData() {
    let saveData = [];
    try {
        const saveData = await getData();
        dom.innerHTML = html(saveData);
    } catch (error) {
        console.log(error);
    }
}

function html(data) {
    return data.map(item => {
        return `<img src="${item.images}" alt="${item.slug}"/> <h1>${item.title}</h1>`;
    }).join('');
}

tryGetData()