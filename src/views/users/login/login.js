import {loginUsers} from "@data/users/loginUsers.js";

const loginForm = document.getElementById("box1");

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    loginUsers(email, password);
});
