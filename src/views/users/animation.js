const box2 = document.getElementById("box2");
const box1 = document.getElementById("box1");
const btnLogin = document.getElementById("btn-login");
const btnRegister = document.getElementById("btn-register");

function moveTo1() {
    box2.className = "box right";  // ocultar el anterior
    box1.className = "box active"; // mostrar el nuevo
    btnLogin.classList.add("active");
    btnRegister.classList.remove("active");
}

function moveTo2() {
    box1.className = "box left";   // ocultar el anterior
    box2.className = "box active"; // mostrar el nuevo
    btnLogin.classList.remove("active");
    btnRegister.classList.add("active");
}
