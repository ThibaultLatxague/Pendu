function getInputUtilisateur() {
    let form = document.getElementById('formElement'); // get le form
    let input = document.getElementById('inputTexte'); // get l'input
    let mot = generationMot();
    let motTrouve = false;

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // empeche le formulaire de recharger la page
        let reponse = input.value.trim().toLowerCase(); // réponse en minuscule
        input.value=""; // on clear l'input pour pouvoir entrer du texte directement
        motTrouve = gererInput(reponse, mot); // appel de la fonction qui gere le résultat de l'input

        if (motTrouve) {
            input.disabled = true;
        }
    });
}

getInputUtilisateur();

function gererInput(reponse, mot) {
    let trouve = false;

    if (reponse === mot) {
        console.log(mot + " a été trouvé !");
        trouve = true;
    }

    return trouve;
}

function generationMot() {
    let motATrouver = 'boule';
    return motATrouver;
}