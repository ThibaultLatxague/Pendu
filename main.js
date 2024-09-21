let boutonRestart = document.getElementById('restart'); //Get le bouton restart
let input = document.getElementById('inputTexte'); //Get l'input utilisateur
let listeTentees = document.getElementById('ulLettresTentees'); //Get la liste des lettre essayées
let motAffiche = document.getElementById('wordToFind'); //Get l'elt qui affiche le mot généré
let nombreLettresAffichees = document.getElementById('nbrLettres');
let motCache = document.getElementById('wordToFindHidden');
let mot = '';
let erreurs = document.getElementById('nbrMauvais');

boutonRestart.addEventListener('click', () =>{
    handleRestart(); //A chaque clique, on déclenche la fonction
});

getInputUtilisateur();

let formListenerAdded = false; // Ajout d'une variable pour suivre l'ajout de l'écouteur

async function getInputUtilisateur() {
    let form = document.getElementById('formElement'); //Get le forumlaire

    mot = await generationMot(); //On attend l'exec complète de la fonction
    afficheExtremitesMot(mot); //On affiche le mot sur le site (avec espaces et _)
    console.log(mot); //Sympa pour le débug dans la console

    // On vérifie si l'écouteur a déjà été ajouté pour éviter la duplication
    if (!formListenerAdded) {
        form.addEventListener('submit', (event) => { //Déclenchement quand appuie bouton form
            event.preventDefault(); // Empêche le rechargement de la page
            let reponse = input.value.trim().toLowerCase(); // Réponse en minuscule
            input.value = ""; // On clear l'input
            gererInput(reponse); // Appel de la fonction qui gère le résultat de l'input
        });
        formListenerAdded = true; // Marquer l'écouteur comme ajouté
    }
}

function handleRestart() {
    input.disabled = false; //On réactive le bouton in case
    input.placeholder = 'Entrez un mot ou caractère...'; //On remet le placeholder de base ------ Aucun changement si sélectionné
    input.classList.remove('success'); //On repasse au style de base CSS

    //Suppression de tous les enfants tant qu'il y en a un
    while (listeTentees.firstChild) {
        listeTentees.removeChild(listeTentees.firstChild);
    };

    getInputUtilisateur(); //On redémarre le processus : génération de mot etc
}

function gererInput(reponse) {
    let motSansAccents = mot.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); //NON FONCTIONNEL gère les accents

    // Vérifier une lettre unique
    if (motSansAccents.includes(reponse) && reponse.length === 1) {
        //On affiche la lettre dans le mot
        metAJourMot(reponse);
    } 

    // Vérifier si le mot COMPLET est trouvé
    else if (reponse == mot || reponse == motSansAccents) {
        motEstTrouve();
    } 

    // Si rien n'est trouvé
    else {
        gestionErreurs(reponse);
    }

    ajouterEspaces();
}

function gestionErreurs(reponse) {
    erreursNoHTML = parseInt(erreurs.textContent);
    erreursNoHTML ++;

    if (erreursNoHTML == 10) {
        //Si le max d'erreurs a été atteint, on désactive la saisie
        input.disabled = true;
    }

    //On créé l'elt liste qu'on affichera ensuite
    let li = document.createElement('li');
    li.textContent = reponse;
    listeTentees.appendChild(li);
    erreurs.textContent = erreursNoHTML;
}

function motEstTrouve() {
    input.disabled = true; //On désactive le bouton
    input.placeholder = 'Mot trouvé !'; //On change le placeholder pour un truc zouli
    input.classList.add('success'); //On change le style dans le CSS
    motAffiche.textContent = mot;
}

function metAJourMot(lettre) {
    let motHTML = motAffiche.textContent.split(''); // Convertir la chaîne en tableau pour modification
    let compteur_ = 0; //Le compteur de _

    for (let i = 0; i < mot.length; i++) {
        const element = mot[i];
        const elementHTML = motHTML[i];
        
        if (element == lettre) {
            motHTML[i] = element; // Modifier l'élément dans le tableau
        } else if (motHTML[i] == '_') {
            compteur_ ++;
        }
    }

    //S'ill n'y a plus de _ alors c'est gagné
    if (compteur_ == 0) {
        motEstTrouve();
    }

    motAffiche.textContent = motHTML.join(''); // Reconvertir le tableau en chaîne et mettre à jour l'affichage
}


function afficheExtremitesMot(mot) {
    let motSecret = '';

    for (let i = 0; i < mot.length; i++) {
        const element = mot[i];
        
        //On affiche seulement la lettre de début et de fin
        if (i == 0 || i == mot.length - 1) {
            motSecret += element;
        } else {
            motSecret += '_';
        }
    }

    //On stock tout ça pour le récup autre part
    motAffiche.textContent = motSecret;
    motCache.textContent = motSecret;
    ajouterEspaces();
}

function ajouterEspaces() {
    let motSansEspaces = motAffiche.textContent;
    let motAvecEspaces = '';
    
    //On créé un nouveau mot qui a 1 lettre du mot original pour 1 espace
    for (let i = 0; i < motSansEspaces.length; i++) {
        const element = motSansEspaces[i];
        motAvecEspaces += element + ' ';
    }

    motCache.textContent = motAvecEspaces;
}

async function generationMot() {
    try {
        const response = await fetch('mots.json');
        const data = await response.json();
        const mots = data.mots;
        const motATrouver = mots[Math.floor(Math.random() * mots.length)];
        nombreLettresAffichees.textContent = '(' + motATrouver.length + " lettres)";
        return motATrouver; // Retourner le mot
    } catch (error) {
        console.error('Erreur de chargement du fichier JSON:', error);
    }
}