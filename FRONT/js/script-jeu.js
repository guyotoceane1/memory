const getParameters = new URLSearchParams(window.location.search); //Objet qui va permettre de récupérer les paramètres de GET de l'url, notemment pour la difficulté

let difficulte = getParameters.get('d');
var jeu = new Jeu(difficulte);

jeu.startChronos(); //on lance le chronos

//Quand on clique sur une carte
$('.carte').on('click', (e) => {
    let carteParent = $(e.target).parent(); //recupération du parent (.carte)
    $(carteParent).removeClass('rotate-verso');
    jeu.selectionCarte(carteParent);
  });