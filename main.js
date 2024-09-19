let chaine = ".pied+.portant+.potence+.corde+.tete+.corps+.brasD+.brasG+.jambeD+.jambeG";

// Remplacer tous les points de chaine
for(let i = 0; i < chaine.length; i++){
    if(chaine[i] === "."){
        chaine = chaine.replace(chaine[i], "#");
    }
}

console.log(chaine)