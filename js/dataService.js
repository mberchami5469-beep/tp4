
export const fetchBoxeurs = async () => {

    const response =
        await fetch("./data/data.json");

    if (!response.ok) {

        throw new Error(
            "Impossible de charger les boxeurs."
        );

    }

    const boxeurs =
        await response.json();

    return boxeurs;
};
