
const boxeursTable =
    document.querySelector("#boxeursTable");

const resultCount =
    document.querySelector("#resultCount");

const totalBoxeurs =
    document.querySelector("#totalBoxeurs");

const boxeursActifs =
    document.querySelector("#boxeursActifs");

const abonnementsPayes =
    document.querySelector("#abonnementsPayes");

const montantTotal =
    document.querySelector("#montantTotal");

const detailBoxeur =
    document.querySelector("#detailBoxeur");




const getStatusClass = (active) => {

    if (active) {
        return "text-success";
    }

    return "text-danger";
};




const createBoxeurRow = (boxeur) => {

    const paymentText =
        boxeur.paid ? "Payé" : "Non payé";

    const paymentClass =
        boxeur.paid ? "text-success" : "text-danger";

    const statusText =
        boxeur.active ? "Actif" : "Inactif";

    const statusClass =
        getStatusClass(boxeur.active);

    return `
        <tr>
            <td>#${boxeur.id}</td>

            <td>${boxeur.name}</td>

            <td>${boxeur.category}</td>

            <td>${boxeur.value} DH</td>

            <td class="${paymentClass}">
                ${paymentText}
            </td>

            <td>${boxeur.date}</td>

            <td>
                <button
                    class="btn btn-sm btn-outline-dark details-btn"
                    data-id="${boxeur.id}"
                >
                    Voir
                </button>

                <span class="${statusClass}">
                    ${statusText}
                </span>
            </td>
        </tr>
    `;
};



export const renderBoxeurs = (boxeurs) => {

    resultCount.textContent =
        `${boxeurs.length} boxeur(s) affiché(s)`;

    if (boxeurs.length === 0) {

        boxeursTable.innerHTML = `
            <tr>
                <td colspan="7"
                    class="text-center text-muted py-4">
                    Aucun boxeur trouvé.
                </td>
            </tr>
        `;

        return;
    }

    boxeursTable.innerHTML =
        boxeurs.map(createBoxeurRow).join("");
};



export const renderStats = (boxeurs) => {

    // Nombre total de boxeurs
    totalBoxeurs.textContent =
        boxeurs.length;

    // Nombre de boxeurs actifs
    const actifs = boxeurs.filter(
        boxeur => boxeur.active
    );

    boxeursActifs.textContent =
        actifs.length;

    // Nombre d'abonnements payés
    const payes = boxeurs.filter(
        boxeur => boxeur.paid
    );

    abonnementsPayes.textContent =
        payes.length;

  
    let montant = 0;

    boxeurs.forEach(boxeur => {
        montant += boxeur.value;
    });

    montantTotal.textContent =
        `${montant} DH`;
};




export const renderDetail = (boxeur) => {

    if (!boxeur) {
        detailBoxeur.innerHTML = "";
        return;
    }

    detailBoxeur.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h4 class="card-title">
                    ${boxeur.name}
                </h4>

                <p>
                    <strong>Catégorie :</strong>
                    ${boxeur.category}
                </p>

                <p>
                    <strong>Abonnement :</strong>
                    ${boxeur.value} DH
                </p>

                <p>
                    <strong>Paiement :</strong>
                    ${boxeur.paid ? "Payé" : "Non payé"}
                </p>

                <p>
                    <strong>Statut :</strong>
                    ${boxeur.active ? "Actif" : "Inactif"}
                </p>

                <p>
                    <strong>Date d'inscription :</strong>
                    ${boxeur.date}
                </p>

                <p>
                    <strong>Description :</strong>
                    ${boxeur.description}
                </p>

                <button
                    class="btn btn-secondary"
                    id="fermerDetail"
                >
                    Fermer
                </button>
            </div>
        </div>
    `;
};
