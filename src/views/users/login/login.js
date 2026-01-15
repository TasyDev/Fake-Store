import { loginUsers } from "@data/users/loginUsers.js";

const loginForm = document.getElementById("box1");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    const userData = await loginUsers(email, password);
    localStorage.setItem("login", JSON.stringify(userData))
});
