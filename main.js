let boutonRestart = document.getElementById('restart'); //Get le bouton restart
let form = document.getElementById('formElement'); //Get le forumlaire
let input = document.getElementById('inputTexte'); //Get l'input utilisateur
let listeTentees = document.getElementById('ulLettresTentees'); //Get la liste des lettre essayées
let motAffiche = document.getElementById('wordToFind'); //Get l'elt qui affiche le mot généré
let mot = '';

boutonRestart.addEventListener('click', () =>{
    handleRestart();
});

getInputUtilisateur();

let formListenerAdded = false; // Ajout d'une variable pour suivre l'ajout de l'écouteur

async function getInputUtilisateur() {
    mot = await generationMot();
    afficheExtremitesMot(mot);
    console.log(mot);

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
    while (listeTentees.firstChild) {
        listeTentees.removeChild(listeTentees.firstChild);
    };

    getInputUtilisateur(); //On redémarre le processus : génération de mot etc
}

function gererInput(reponse) {
    let erreurs = 0;
    let motSansAccents = mot.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

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
        erreurs ++;
        if (erreurs == 10) {
            input.disabled = true;
        }

        let li = document.createElement('li');
        li.textContent = reponse;
        listeTentees.appendChild(li);
    }
}

function motEstTrouve() {
    input.disabled = true;
        input.placeholder = 'Mot trouvé !';
        input.classList.add('success');
        motAffiche.textContent = mot;
}

function metAJourMot(lettre) {
    let motHTML = motAffiche.textContent.split(''); // Convertir la chaîne en tableau pour modification
    let compteur_ = 0;

    for (let i = 0; i < mot.length; i++) {
        const element = mot[i];
        const elementHTML = motHTML[i];
        
        if (element == lettre) {
            motHTML[i] = element; // Modifier l'élément dans le tableau
        } else if (motHTML[i] == '_') {
            compteur_ ++;
        }
    }

    if (compteur_ == 0) {
        motEstTrouve();
    }

    motAffiche.textContent = motHTML.join(''); // Reconvertir le tableau en chaîne et mettre à jour l'affichage
}


function afficheExtremitesMot(mot) {
    let motSecret = '';

    for (let i = 0; i < mot.length; i++) {
        const element = mot[i];
        
        if (i == 0 || i == mot.length - 1) {
            motSecret += element;
        } else {
            motSecret += '_';
        }
    }

    motAffiche.textContent = motSecret;
}

function ajouterEspaces() {
    
}

async function generationMot() {
    try {
        const response = await fetch('mots.json');
        const data = await response.json();
        const mots = data.mots;
        const motATrouver = mots[Math.floor(Math.random() * mots.length)];
        return motATrouver; // Retourner le mot
    } catch (error) {
        console.error('Erreur de chargement du fichier JSON:', error);
    }
}