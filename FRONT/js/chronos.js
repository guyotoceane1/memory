/** Génération du chronos **
On va définit 2 variables qui ont la même valeur, 1 qui va se décrementer et une qui va servir de référence
Pour un affichage fluide au niveau de la barre qui va servir de chronos, on va la faire évoluer toutes les 50ms
Par défaut le temps d'une partie est de 60sec soit 60000ms, donc il faut diviser par 50 le temps en ms pour trouver le bon ratio
=> 1200 * 50 = 60000
**/
let timer = tempsChronos = 1200; 

let chronos = setInterval(function(){
    timer--;
    if(timer === 0) myStopFunction(); //Quand on arrive à 0, c'est que le temps est écoulé
    let widthProgressBar = timer*100/tempsChronos; //calcul pour trouver l'évolution de la barre de progression du chronos
    $('#chronos__progressbar').css('width', widthProgressBar + "%"); //barre du chronos qui défile
    
},50)


//Fonction pour stoper le chronos
function myStopFunction() {
    clearInterval(chronos);
  }
