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

//On boucle sur le tableau pour afficher les cartes
tabData.forEach(data=>{


    let $container = document.createElement('div'); //Container qui va contenir un cube pour permettre une rotation des cartes visuellement


    let $cubeCarte = document.createElement('div'); //parent qui va contenir le recto et le verso
    $($cubeCarte).addClass('carte')

    //Création du recto de la carte - face cachée
    let $recto = document.createElement('div');
    $($recto).addClass('carte-recto');

    //Creation du verso de la carte - face visible
    let $divPhoto = document.createElement('div');
    $divPhoto.id = data;
    $($divPhoto).addClass('carte-verso');
    // $($divPhoto).hide(); //Par défaut la carte est caché

    // On ajoute les 2 cartes a la div commune
    $($cubeCarte).append($divPhoto);
    $($cubeCarte).append($recto);

    $container.append($cubeCarte); //On affecte le container a la div parent dans le HTML
    divAffichageCarte.append($container); //On affecte le container a la div parent dans le HTML
})




//Fonction pour mélanger un tableau
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }
