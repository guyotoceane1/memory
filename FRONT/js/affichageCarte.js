//Le but ici est d'afficher les cartes dans la même logique que la génération du css

var nbPaires = 18;

var divAffichageCarte = $('#cartes');

// On génère un tableau avec tous les ids générés en sass
var tabData = new Array();
for(let i=1; i<=nbPaires; i++){
    for(let j=1; j<=2; j++){
        tabData.push("carte-"+j+i);
    }
}

tabData = shuffle(tabData); //On randomise les ids pour pouvoir les "mélanger" pour l'afficher sur la page

tabData.forEach(data=>{
    $('#cartes').append("<div id="+data+"></div>");
})



console.log(tabData);
// console.log(shuffle(tabData));


//Fonction pour mélanger un tableau
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }
