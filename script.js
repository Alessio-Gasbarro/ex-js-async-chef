async function getChefBirthday(id) {
    try {
        // 1. Recupera la ricetta
        const recipeRes = await fetch(`https://dummyjson.com/recipes/${id}`);
        // BONUS 1: controlla se la prima richiesta ha successo prima di continuare
        if (!recipeRes.ok) {
            throw new Error("Ricetta non trovata");
        }
        const recipe = await recipeRes.json();
        // 2. Estrai userId dalla ricetta
        const userId = recipe.userId;
        // 3. Recupera i dati dello chef
        const userRes = await fetch(`https://dummyjson.com/users/${userId}`);
        if (!userRes.ok) {
            throw new Error("Chef non trovato");
        }
        const user = await userRes.json();
        // 4. BONUS 2: Formatta la data con dayjs (se disponibile)
        if (typeof dayjs !== "undefined") {
            return dayjs(user.birthDate).format("DD/MM/YYYY");
        }
        // 5. Altrimenti restituisci la data in formato originale
        return user.birthDate;
    } catch (error) {
        // Gestione errori
        throw new Error(error.message || "Errore sconosciuto");
    }
}
//Esempio di utilizzo FIXATO con ASYNC
(async () => {
    try {
        const birthday = await getChefBirthday(1);
        console.log("Data di Nascita dello chef:", birthday);
    } catch (error) {
        console.error("Errore:", error.message)
    }
    console.log('Fine codice!');
})();