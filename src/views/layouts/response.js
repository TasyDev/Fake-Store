export function createMensaggeWaiting(idSection) {
    const createLoadingMessage = document.createElement("h2");
    createLoadingMessage.className = "text-white text-center w-100 loading-message";
    createLoadingMessage.textContent = "Cargando...";
    idSection.appendChild(createLoadingMessage);
}

export function createErrorMessage(idSection, error) {
    const createError = document.createElement("h2");
    createError.className = "text-danger text-center w-100";
    createError.textContent = "Error";
    idSection.appendChild(createError);
    console.log(error);
}

export function deleteMensaggeWaiting(idSection) {
    const loadingMessage = idSection.querySelector(".loading-message");
    if (loadingMessage) {
        loadingMessage.remove();
    }
}

