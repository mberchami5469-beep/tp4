
import { state } from "./state.js";

export const getBoxeur = (id) => {
    return state.boxeurs.find(b => b.id === id);
};


export const getOffre = (id) => {
    return state.offres.find(o => o.id === id);
};


export const getInscriptionDetails = (inscription) => {
    const boxeur = getBoxeur(inscription.boxeurId);
    let total = 0;
    const items = [];

    inscription.items.forEach(item => {
        const offre = getOffre(item.offreId);

        if (offre) {
            const prixTotal = offre.price * item.quantity;
            total += prixTotal;

            items.push({
                name: offre.name,
                category: offre.category,
                price: offre.price,
                duration: offre.duration,
                quantity: item.quantity,
                lineTotal: prixTotal
            });
        }
    });

    return {
        ...inscription,
        boxeur,
        items,
        total
    };
};


export const getBoxeursWithSubscriptions = () => {
    return state.boxeurs.map(boxeur => {
        const inscriptions = state.inscriptions
            .filter(i => i.boxeurId === boxeur.id)
            .map(getInscriptionDetails);

        let value = 0;
        let paid = false;

        inscriptions.forEach(inscription => {
            if (inscription.status === "Payé") {
                paid = true;
            }

            if (inscription.status !== "Annulé") {
                value += inscription.total;
            }
        });

        return {
            ...boxeur,
            inscriptions,
            value,
            paid
        };
    });
};


export const getVisibleBoxeurs = () => {
    const boxeurs = getBoxeursWithSubscriptions();

    return boxeurs.filter(boxeur => {
        const nom = boxeur.name.toLowerCase();
        const recherche = state.search.toLowerCase();

        if (!nom.includes(recherche)) {
            return false;
        }

        if (state.category !== "all" &&
            boxeur.category !== state.category) {
            return false;
        }

        if (state.status === "Actif" && !boxeur.active) {
            return false;
        }

        if (state.status === "Inactif" && boxeur.active) {
            return false;
        }

        if (state.paidOnly && !boxeur.paid) {
            return false;
        }

        return true;
    });
};


export const getStats = () => {
    const boxeurs = getBoxeursWithSubscriptions();

    let actifs = 0;
    let payes = 0;
    let montant = 0;

    boxeurs.forEach(boxeur => {
        if (boxeur.active) {
            actifs++;
        }

        montant += boxeur.value;
    });

    state.inscriptions.forEach(inscription => {
        if (inscription.status === "Payé") {
            payes++;
        }
    });

    return {
        total: boxeurs.length,
        actifs,
        payes,
        montant
    };
};
