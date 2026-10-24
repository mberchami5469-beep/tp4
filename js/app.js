
import { state } from "./state.js";

import { fetchBoxeurs } from "./dataService.js";

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


const getVisibleBoxeurs = () => {

    return state.boxeurs.filter(boxeur => {

      
        const matchesSearch =
            boxeur.name.toLowerCase().includes(
                state.search.toLowerCase()
            );

      
        const matchesCategory =
            state.category === "all" ||
            boxeur.category === state.category;

        const matchesStatus =
            state.status === "all" ||
            (state.status === "Actif" && boxeur.active) ||
            (state.status === "Inactif" && !boxeur.active);


        const matchesPayment =
            !state.paidOnly || boxeur.paid;

        return (
            matchesSearch &&
            matchesCategory &&
            matchesStatus &&
            matchesPayment
        );
    });
};



const render = () => {

    const visibleBoxeurs = getVisibleBoxeurs();

    renderBoxeurs(visibleBoxeurs);

  
    renderStats(state.boxeurs);
};



searchInput.addEventListener("input", event => {

    state.search = event.target.value.trim();

    render();
});



categorySelect.addEventListener("change", event => {

    state.category = event.target.value;

    render();
});



statusButtons.forEach(button => {

    button.addEventListener("click", () => {

        state.status = button.dataset.status;

        render();
    });
});


paidOnly.addEventListener("change", event => {

    state.paidOnly = event.target.checked;

    render();
});



boxeursTable.addEventListener("click", event => {

    const button = event.target.closest(".details-btn");

    if (!button) {
        return;
    }

    const boxeurId = Number(button.dataset.id);

    const boxeur = state.boxeurs.find(
        boxeur => boxeur.id === boxeurId
    );

    if (!boxeur) {
        return;
    }

    renderDetail(boxeur);
});



document.addEventListener("click", event => {

    if (event.target.id === "fermerDetail") {
        renderDetail(null);
    }
});



const init = async () => {

    try {

        const boxeurs = await fetchBoxeurs();

        
        state.boxeurs = boxeurs;

        
        render();

    }  catch (error) {
    console.error("Erreur de chargement :", error);
    console.error("Détail :", error.message);

    errorMessage.classList.remove("d-none");
    errorMessage.textContent = error.message;

}};




init();
