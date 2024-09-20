let boutonRestart = document.getElementById('restart');
let form = document.getElementById('formElement'); // get le form
let input = document.getElementById('inputTexte'); // get l'input

boutonRestart.addEventListener('click', () =>{
    handleRestart();
});

getInputUtilisateur();


function getInputUtilisateur() {
    let mot = generationMot();
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // empeche le formulaire de recharger la page
        let reponse = input.value.trim().toLowerCase(); // réponse en minuscule
        input.value=""; // on clear l'input pour pouvoir entrer du texte directement
        gererInput(reponse, mot); // appel de la fonction qui gere le résultat de l'input
    });
}

function handleRestart() {
    
}

function gererInput(reponse, mot) {
    let liste = document.getElementById('ulLettres');
    let erreurs = 0;

    // Vérifier une lettre unique
    if (mot.includes(reponse) && reponse.length === 1) {
        let li = document.createElement('li');
        li.textContent = reponse;
        liste.appendChild(li);
        console.log('comprend la lettre !');
    } 
    // Vérifier si le mot COMPLET est trouvé
    else if (reponse == mot) {
        console.log(mot + " a été trouvé !");
        input.disabled = true;
        input.placeholder = 'Mot trouvé !';
        input.classList.add('success');
    } 
    // Si rien n'est trouvé
    else {
        erreurs ++;
        console.log("Nombre d'erreurs : " + erreurs);
        if (erreurs == 10) {
            input.disabled = true;
        }
    }

    console.log("Taille du mot : " + reponse.length);
}

function generationMot() {
    let motATrouver = 'boule';
    return motATrouver;
}