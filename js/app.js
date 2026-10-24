
import { state } from "./state.js";

import { fetchAllData} from "./dataService.js";
import {
    getVisibleBoxeurs,
    getBoxeursWithSubscriptions
} from "./selectors.js";
import {
    renderBoxeurs,
    renderStats,
    renderDetail
} from "./view.js";



const searchInput = document.querySelector("#name");
const categorySelect = document.querySelector("#categorie");
const statusButtons = document.querySelectorAll(".status-btn");
const paidOnly = document.querySelector("#check");
const boxeursTable = document.querySelector("#boxeursTable");
const errorMessage = document.querySelector("#messageErreur");


const render = () => {
    renderBoxeurs(getVisibleBoxeurs());
    renderStats();
};


searchInput.addEventListener("input", () => {
    state.search = searchInput.value;
    render();
});


categorySelect.addEventListener("change", () => {
    state.category = categorySelect.value;
    render();
});


statusButtons.forEach(button => {
    button.addEventListener("click", () => {
        state.status = button.dataset.status;

        statusButtons.forEach(btn => {
            btn.classList.remove("btnactive");
        });

        button.classList.add("btnactive");
        render();
    });
});

paidOnly.addEventListener("change", () => {
    state.paidOnly = paidOnly.checked;
    render();
});


boxeursTable.addEventListener("click", event => {
    const button = event.target.closest(".details-btn");

    if (button) {
        const id = Number(button.dataset.id);
        const boxeur = getBoxeursWithSubscriptions()
            .find(b => b.id === id);

        renderDetail(boxeur);
    }
});


document.addEventListener("click", event => {
    if (event.target.id === "fermerDetail") {
        renderDetail(null);
    }
});


const init = async () => {
    try {
        const data = await fetchAllData();

        state.boxeurs = data.boxeurs;
        state.offres = data.offres;
        state.inscriptions = data.inscriptions;

        render();
    } catch (error) {
       console.error("Erreur détaillée :", error);
    errorMessage.textContent = error.message;
    }
};




init();
