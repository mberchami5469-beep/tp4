
import { getStats } from "./selectors.js";
const boxeursTable =document.querySelector("#boxeursTable");
const resultCount =document.querySelector("#resultCount");
const totalBoxeurs =   document.querySelector("#totalBoxeurs");
const boxeursActifs =document.querySelector("#boxeursActifs");
const abonnementsPayes =document.querySelector("#abonnementsPayes");
const montantTotal =document.querySelector("#montantTotal");
const detailBoxeur = document.querySelector("#detailBoxeur");


const createBoxeurRow = (boxeur) => {
    return `
        <tr>
            <td>#${boxeur.id}</td>
            <td>${boxeur.name}</td>
            <td>${boxeur.category}</td>
          <td>${boxeur.value} DH</td>
          <td>${boxeur.paid ? "Payé" : "Non payé"}</td>
            <td>${boxeur.date}</td>
            <td>
                <button class="btn btn-sm btn-dark details-btn"
                    data-id="${boxeur.id}">
                    Voir
                </button>
                ${boxeur.active ? "Actif" : "Inactif"}
            </td>
        </tr>
    `;
};



export const renderBoxeurs = (boxeurs) => {

    resultCount.textContent =
          boxeurs.length + " boxeur(s) affiché(s)";
    if (boxeurs.length === 0) {
        boxeursTable.innerHTML = `
             <tr>
                <td colspan="7">Aucun boxeur trouvé.</td>
            </tr>
        `;

        return;
    }

    boxeursTable.innerHTML = boxeurs.map(createBoxeurRow).join("");
};



export const renderStats = () => {
    const stats = getStats();

    totalBoxeurs.textContent = stats.total;
    boxeursActifs.textContent = stats.actifs;
    abonnementsPayes.textContent = stats.payes;
    montantTotal.textContent = stats.montant + " DH";
};

export const renderDetail = (boxeur) => {

    if (!boxeur) {
        detailBoxeur.innerHTML = "";
        return;
    }
   let html = `
        <div class="card mt-4">
            <div class="card-body">
                <h4>${boxeur.name}</h4>
                <p>Catégorie : ${boxeur.category}</p>
                <p>Statut : ${boxeur.active ? "Actif" : "Inactif"}</p>
                <p>Montant : ${boxeur.value} DH</p>
                <p>Date : ${boxeur.date}</p>
                <p>${boxeur.description}</p>
                <hr>
                <h5>Historique des inscriptions</h5>
    `;

    if (boxeur.inscriptions.length === 0) {
        html += "<p>Aucune inscription.</p>";
    } else {
        boxeur.inscriptions.forEach(inscription => {
            html += `
                <div class="border p-3 mb-3">
                    <p>Inscription #${inscription.id}</p>
                    <p>Date : ${inscription.date}</p>
                    <p>Statut : ${inscription.status}</p>
                    <ul>
            `;

            inscription.items.forEach(item => {
                html += `
                    <li>
                        ${item.name} - ${item.quantity} x
                        ${item.price} DH = ${item.lineTotal} DH
                    </li>
                `;
            });

            html += `
                    </ul>
                    <p>Total : ${inscription.total} DH</p>
                </div>
            `;
        });
    }

    html += `
                <button class="btn btn-secondary" id="fermerDetail">
                    Fermer
                </button>
            </div>
        </div>
    `;

    detailBoxeur.innerHTML = html;
    detailBoxeur.scrollIntoView();
};

