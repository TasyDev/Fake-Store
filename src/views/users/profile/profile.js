const usernameEl = document.getElementById("profile-username");
const roleEl = document.getElementById("profile-role");
const avatarEl = document.getElementById("profile-avatar");

const inputUsername = document.getElementById("input-username");
const inputEmail = document.getElementById("input-email");
const inputPassword = document.getElementById("input-password");
const inputAvatar = document.getElementById("input-avatar");
const form = document.getElementById("profile-form");

const userData = JSON.parse(localStorage.getItem("login"));

if (userData) {
    // Texto del perfil
    usernameEl.textContent = userData.name || "Username";
    roleEl.textContent = userData.role || "Role";

    // Imagen
    if (userData.avatar) {
        avatarEl.src = userData.avatar;
    }

    // Placeholders o values
    inputUsername.placeholder = userData.name || "Actual name";
    inputEmail.placeholder = userData.email || "Actual email";
}

// Preview de imagen cuando suben una nueva
inputAvatar.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
        avatarEl.src = reader.result;
    };
    reader.readAsDataURL(file);
});

// Submit del form
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const updatedUser = {
        ...userData,
        name: inputUsername.value || userData.name,
        email: inputEmail.value || userData.email,
    };

    localStorage.setItem("login", JSON.stringify(updatedUser));

    usernameEl.textContent = updatedUser.name;
});
