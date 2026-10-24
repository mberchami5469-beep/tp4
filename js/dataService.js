
const fetchJSON = async (url) => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(
            "Impossible de charger le fichier : " + url
        );
    }

    return await response.json();
};
export const fetchBoxeurs = async () => {

    return  await fetchJSON("./data/boxeurs.json");

    };

    export const fetchAllData = async () => {
    try {
        const [boxeurs, offres, inscriptions] =
            await Promise.all([
  fetchJSON("./data/boxeurs.json"),
 fetchJSON("./data/offres.json"),
fetchJSON("./data/inscriptions.json")
 ]);

        return {
    boxeurs,
    offres,
    inscriptions
        };
    } catch (error) {
        console.error("Erreur de chargement :", error);
        throw error;
    }
};
