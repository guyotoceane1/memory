let nbClick = 0; //On initialise le nombre de click pour pouvoir limiter la vue à 2 cartes

const regex = /(carte-\d)/gm; //regex qui servira pour comparer les ids des cartes

let carte1;
let carte2;

//Quand on clique sur une carte
$('.carte').on('click', (e) => {
    let carteParent = $(e.target).parent(); //recupération du parent (.carte)
    $(carteParent).removeClass('rotate-verso');
    let carteListeEnfant = carteParent.children(); //recuparation des enfants recto & verso
    if(!$(carteParent).hasClass('rotate-recto') && nbClick < 2){ //On verifie que la carte n'a pas été retourné et qu'il n'y a pas 2 autres cartes de retourné sur le plateau
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
                console.log("succes")
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