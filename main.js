let boutonRestart = document.getElementById('restart');
let form = document.getElementById('formElement'); // get le form
let input = document.getElementById('inputTexte'); // get l'input
let liste = document.getElementById('ulLettres');
let motAffiche = document.getElementById('wordToFind');

boutonRestart.addEventListener('click', () =>{
    handleRestart();
});

getInputUtilisateur();

let formListenerAdded = false; // Ajout d'une variable pour suivre l'ajout de l'écouteur

async function getInputUtilisateur() {
    let mot = await generationMot();
    motAffiche.textContent = mot;
    mot = motAffiche.textContent;

    // On vérifie si l'écouteur a déjà été ajouté pour éviter la duplication
    if (!formListenerAdded) {
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Empêche le rechargement de la page
            let reponse = input.value.trim().toLowerCase(); // Réponse en minuscule
            input.value = ""; // On clear l'input
            gererInput(reponse); // Appel de la fonction qui gère le résultat de l'input
        });
        formListenerAdded = true; // Marquer l'écouteur comme ajouté
    }
}

function handleRestart() {
    input.disabled = false;
    input.placeholder = 'Entrez un mot ou caractère...';
    input.classList.remove('success');

    //Suppression de tous les enfants tant qu'il y en a un
    while (liste.firstChild) {
        liste.removeChild(liste.firstChild);
    };

    getInputUtilisateur(); //On redémarre le processus : génération de mot etc
}

function gererInput(reponse) {
    mot = motAffiche.textContent;
    let changement = true;
    let erreurs = 0;
    console.log("Fonction gererInput mot : " + mot);

    // Vérifier une lettre unique
    if (mot.includes(reponse) && reponse.length === 1) {
        let li = document.createElement('li');
        li.textContent = reponse;
        liste.appendChild(li);
        //console.log('comprend la lettre !');
    } 

    // Vérifier si le mot COMPLET est trouvé
    else if (reponse == mot) {
        //console.log(mot + " a été trouvé !");
        input.disabled = true;
        input.placeholder = 'Mot trouvé !';
        input.classList.add('success');
    } 

    // Si rien n'est trouvé
    else {
        erreurs ++;
        //console.log("Nombre d'erreurs : " + erreurs);
        if (erreurs == 10) {
            input.disabled = true;
        }
    }

    //console.log("Taille du mot : " + reponse.length);
    mot = '';
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