function getInputUtilisateur() {
    let form = document.getElementById('formElement'); // get le form
    let input = document.getElementById('inputTexte'); // get l'input

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // empeche le formulaire de recharger la page
        let reponse = input.value.trim().toLowerCase(); // réponse en minuscule
        input.value=""; // on clear l'input pour pouvoir entrer du texte directement
        gererInput(reponse); // appel de la fonction qui gere le résultat de l'input
    });
}

getInputUtilisateur();

function gererInput(param) {
    console.log(param);
}

function generationMot() {
    console.log('cc');
}