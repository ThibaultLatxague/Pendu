let boutonRestart = document.getElementById('restart');
let form = document.getElementById('formElement'); // get le form
let input = document.getElementById('inputTexte'); // get l'input
let liste = document.getElementById('ulLettres');

boutonRestart.addEventListener('click', () =>{
    handleRestart();
});

getInputUtilisateur();


async function getInputUtilisateur() {
    let mot = await generationMot();
    console.log(mot);
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // empeche le formulaire de recharger la page
        let reponse = input.value.trim().toLowerCase(); // réponse en minuscule
        input.value=""; // on clear l'input pour pouvoir entrer du texte directement
        gererInput(reponse, mot); // appel de la fonction qui gere le résultat de l'input
    });
}

function handleRestart() {
    input.disabled = false;
    input.placeholder = 'Entrez un mot ou caractère...';
    input.classList.remove('success');

    //Suppression de tous les enfants tant qu'il y en a un
    while (liste.firstChild) {
        liste.removeChild(liste.firstChild);
    };
}

function gererInput(reponse, mot) {
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

async function generationMot() {
    try {
        const response = await fetch('mots.json');
        const data = await response.json();
        const mots = data.mots;
        const motATrouver = mots[Math.floor(Math.random() * mots.length)];
        console.log(motATrouver); // Afficher le mot sélectionné
        return motATrouver; // Retourner le mot
    } catch (error) {
        console.error('Erreur de chargement du fichier JSON:', error);
    }
}