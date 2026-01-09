let showingFirst = true;
const box2 = document.getElementById("box2");
const box1 = document.getElementById("box1");

function moveTo1() {
    box2.className = "box right";  // ocultar el anterior
    box1.className = "box active"; // mostrar el nuevo
}

function moveTo2() {
    box1.className = "box left";   // ocultar el anterior
    box2.className = "box active"; // mostrar el nuevo
}
