let nbClick = 0; //On initialise le nombre de click pour pouvoir limiter la vue à 2 cartes

const regex = /(carte-\d)/gm; //regex qui servira pour comparer les ids des cartes

let carte1;
let carte2;

//Quand on clique sur une carte
$('.carte').on('click', (e) => {
    let carteParent = $(e.target).parent(); //recupération du parent (.carte)
    let carteListeEnfant = carteParent.children(); //recuparation des enfants recto & verso
    if($(carteListeEnfant[0]).is(":visible")){ //Si le recto est visible c'est que la carte n'est pas retourné
        if(nbClick === 0){ //Si on a pas encore cliqué on affecte à la carte 1
            carte1 = carteParent; 
        } else { //Sinon on affecte la carte 2
            carte2 = carteParent; 
        }

        $(carteListeEnfant[0]).hide();
        $(carteListeEnfant[1]).show();
        nbClick++;

        if(nbClick == 2){
            let carte1Children = carte1.children();
            let carte2Children = carte2.children();

            //On ne recupère que les ids correspondant a la carte pour comparer les chiffres
            let idCarte1 = carte1Children[1].id.replace(regex, '');
            let idCarte2 = carte2Children[1].id.replace(regex, '');

            if(idCarte1 === idCarte2){ //Les 2 cartes sont égales
                console.log("succes")
            } else { //Les 2 cartes sont différentes
                setTimeout(function(){
                    $(carte1Children[0]).show();
                    $(carte2Children[0]).show();
                    $(carte1Children[1]).hide();
                    $(carte2Children[1]).hide();
                    
                },1000)
            }

            nbClick = 0 //On réinitialise le nombre de click

        }
    }
  });