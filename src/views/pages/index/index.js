import { getData } from "../../../data/api/getAll.js";

async function tryGetData() {
    let saveData = [];
    try {
        saveData = await getData();
        console.log(saveData);
    } catch (error) {
        console.log(error);
    }
}