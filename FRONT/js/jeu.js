const getParameters = new URLSearchParams(window.location.search); //Fonction qui va permettre de récupérer les paramètres de GET de l'url, notemment pour la difficulté

let nbClick = 0; //On initialise le nombre de click pour pouvoir limiter la vue à 2 cartes

let nbPairesTrouve = 0; //variable pour le nombre de paires que l'on a trouvé

let perdu = false;

const regex = /(carte-\d)/gm; //regex qui servira pour comparer les ids des cartes

let carte1;
let carte2;


//Quand on clique sur une carte
$('.carte').on('click', (e) => {
    let carteParent = $(e.target).parent(); //recupération du parent (.carte)
    $(carteParent).removeClass('rotate-verso');
    let carteListeEnfant = carteParent.children(); //recuparation des enfants recto & verso
    if(!$(carteParent).hasClass('rotate-recto') && nbClick < 2 && !perdu){ //On verifie que la carte n'a pas été retourné, qu'il n'y a pas 2 autres cartes de retourné sur le plateau et qu'on a pas perdu
        if(nbClick === 0){ //Si on a pas encore cliqué on affecte à la carte 1
            carte1 = carteParent; 
        } else { //Sinon on affecte la carte 2
            carte2 = carteParent; 
        }

        $(carteParent).addClass('rotate-recto');

        // $(carteListeEnfant[0]).hide();
        // $(carteListeEnfant[1]).show();
        nbClick++;

        if(nbClick == 2){
            let carte1Children = carte1.children();
            let carte2Children = carte2.children();

            console.log(carte1Children)

            //On ne recupère que les ids correspondant a la carte pour comparer les chiffres
            let idCarte1 = carte1Children[0].id.replace(regex, '');
            let idCarte2 = carte2Children[0].id.replace(regex, '');

            if(idCarte1 === idCarte2){ //Les 2 cartes sont égales
                console.log("succes");
                
                nbPairesTrouve ++;  
                verifPaires();

                nbClick = 0 //On réinitialise le nombre de click    
            } else { //Les 2 cartes sont différentes
                setTimeout(function(){
                    carte1.removeClass('rotate-recto');
                    carte1.addClass('rotate-verso');
                    carte2.removeClass('rotate-recto');
                    carte2.addClass('rotate-verso');
                    nbClick = 0 //On réinitialise le nombre de click    
                },1000)
            }

        }
    }
    
  });


/** Génération du chronos **
On va définit 2 variables qui ont la même valeur, 1 qui va se décrementer et une qui va servir de référence
Pour un affichage fluide au niveau de la barre qui va servir de chronos, on va la faire évoluer toutes les 50ms
Par défaut le temps d'une partie est de 120sec soit 120000ms, donc il faut diviser par 50 le temps en ms pour trouver le bon ratio
=> 2400 * 50 = 120000
**/

console.log(getParameters.get('d'))

let difficulte = getParameters.get('d');

let tempsParDefautEnMs;;

switch(difficulte){
    case 'fac':
        tempsParDefautEnMs = 300000;
        break;
    case 'mod':
        tempsParDefautEnMs = 180000;
        break;
    case 'dif':
        tempsParDefautEnMs = 120000;
        break;
    case 'ext':
        tempsParDefautEnMs = 60000;
        break;

}

let vitesseSetTimout = 50;

let timer = tempsChronos = tempsParDefautEnMs/vitesseSetTimout; 


let chronos = setInterval(function(){
    timer--;
    if(timer === 0) verifPaires(); //Quand on arrive à 0, c'est que le temps est écoulé
    let widthProgressBar = timer*100/tempsChronos; //calcul pour trouver l'évolution de la barre de progression du chronos
    $('#chronos__progressbar').css('width', widthProgressBar + "%"); //barre du chronos qui défile
    
},vitesseSetTimout)




//Fonction pour vérifier si on a trouvé toutes les paires 
function verifPaires(){
    if(nbPairesTrouve === nbPaires){ //cas ou on gagne
        clearInterval(chronos);
        alert('BRAVO !');
        console.log(timer)
    } else if(timer === 0) { //cas ou on perd
        perdu = true;
        alert('Perdu !')
        clearInterval(chronos);
    } 
}
