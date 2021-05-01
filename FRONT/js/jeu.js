const getParameters = new URLSearchParams(window.location.search); //Objet qui va permettre de récupérer les paramètres de GET de l'url, notemment pour la difficulté

var nbClick = 0; //On initialise le nombre de click pour pouvoir limiter la vue à 2 cartes

var nbPairesTrouve = 0; //variable pour le nombre de paires que l'on a trouvé

var perdu = false;

const regex = /(carte-\d)/gm; //regex qui servira pour comparer les ids des cartes

var carte1;
var carte2;


//Quand on clique sur une carte
$('.carte').on('click', (e) => {
    let carteParent = $(e.target).parent(); //recupération du parent (.carte)
    console.log(perdu)
    $(carteParent).removeClass('rotate-verso');
    let carteListeEnfant = carteParent.children(); //recuparation des enfants recto & verso
    if(!$(carteParent).hasClass('rotate-recto') && nbClick < 2 && !perdu){ //On verifie que la carte n'a pas été retourné, qu'il n'y a pas 2 autres cartes de retourné sur le plateau et qu'on a pas perdu
        if(nbClick === 0){ //Si on a pas encore cliqué on affecte à la carte 1
            carte1 = carteParent; 
        } else { //Sinon on affecte la carte 2
            carte2 = carteParent; 
        }

        $(carteParent).addClass('rotate-recto'); //rotation de la carte pour pouvoir la voir
        nbClick++;

        if(nbClick === 2){ //Quand on a 2 clics, c'est qu'on a retourné 2 cartes, c'est a ce moment là qu'on fait la comparaison
            let carte1Children = carte1.children();
            let carte2Children = carte2.children();

            //On ne recupère que les ids correspondant a la carte avec le fruit pour comparer les chiffres
            let idCarte1 = carte1Children[0].id.replace(regex, '');
            let idCarte2 = carte2Children[0].id.replace(regex, '');

            if(idCarte1 === idCarte2){ //Les 2 cartes sont égales
                nbPairesTrouve ++;  
                nbClick = 0 //On réinitialise le nombre de click pour pouvoir de nouveau retourner 2 nouvelles cartes
                verifPaires(); //Pour vérifier si on a gagné ou perdu, dans le cas "neutre" / partie encore en cours il ne se passe rien et le jeu continue
                enregistrerScore(); //TODO test pour dev à retirer
  
            } else { //Les 2 cartes sont différentes
                setTimeout(function(){
                    //On remet les cartes face caché
                    carte1.removeClass('rotate-recto');
                    carte1.addClass('rotate-verso');
                    carte2.removeClass('rotate-recto');
                    carte2.addClass('rotate-verso');
                    nbClick = 0 //On réinitialise le nombre de click    
                },1000) //set Timout = le callback ne s'executeras qu'à la fin des 1s (1000ms), permet de laisser du temps au joueur de regarder ou se trouve les cartes.
            }

        }
    }
    
  });


/** Génération du chronos **
On va définir 2 variables qui ont la même valeur, 1 qui va se décrementer et une qui va servir de référence
Pour un affichage fluide au niveau de la barre qui va servir de chronos, on va la faire évoluer toutes les 50ms
Par défaut le temps d'une partie est de 180sec soit 180000ms, donc il faut diviser par 50 le temps en ms pour le setInterval (qui va permettre de diminuer le temps à un interval régulier)
Mais, l'utilisateur à la possibilité sur la page d'accueil de choisir son niveau parmis 4
**/

let difficulte = getParameters.get('d');

let tempsParDefautEnMs = 180000;

//Affectation de la durée en ms en fonction de la difficulté
switch(difficulte){
    case 'facile':
        tempsParDefautEnMs = 300000;
        break;
    case 'modere':
        tempsParDefautEnMs = 180000;
        break;
    case 'difficile':
        tempsParDefautEnMs = 120000;
        break;
    case 'extreme':
        tempsParDefautEnMs = 60000;
        break; 


}

let vitesseSetInterval = 50; //Fréquence en ms à laquelle le setInterval va relancer la fonction en callback

let timer = tempsChronos = tempsParDefautEnMs/vitesseSetInterval; 


let chronos = setInterval(function(){
    timer--;
    if(timer === 0) verifPaires(); //Quand on arrive à 0, c'est que le temps est écoulé
    let widthProgressBar = timer*100/tempsChronos; //calcul pour trouver l'évolution de la barre de progression du chronos
    $('#chronos__progressbar').css('width', widthProgressBar + "%"); //barre du chronos qui défile
    
},vitesseSetInterval)

//Fonction pour vérifier si on a trouvé toutes les paires 
function verifPaires(){
    if(nbPairesTrouve === nbPaires){ //cas ou on gagne
        clearInterval(chronos);
        console.log(timer);
        enregistrerScore();
    } else if(timer === 0) { //cas ou on perd
        perdu = true;
        alert('Perdu !')
        clearInterval(chronos);
    } 
}

//requete ajax pour sauvegarder les scores
function enregistrerScore(){
    let temps = (tempsParDefautEnMs - (timer * vitesseSetInterval)) / 1000;

    //Par défaut, le pseudo est anonymous, mais si la personne à saisi son pseudo / qu'il est sauvegardé en localStorage, alors on utilise ce pseudo
    let pseudo = "Anonymous";
    if(localStorage.getItem("pseudo")){
        pseudo = localStorage.getItem("pseudo");
    }



    let data = {
        pseudo : pseudo,
        temps : temps,
        difficulte : difficulte
    }

    $.ajax({
        type: "POST",
        url: "http://localhost:3000/",
        data: data,
        success: function(response){
            console.log(response)
        },
        error : function(error){
            console.log(error)
        },
        dataType: 'json',
      })
}
