import {createUser} from "@data/users/createUser.js";

const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    createUser(username, email, password);
});
