const regex = /(carte-\d)/gm; //regex qui servira pour comparer les ids des cartes

class Jeu{
    constructor(difficulte){
        this.nbClick = 0; //On initialise le nombre de click pour pouvoir limiter la vue à 2 cartes
        this.nbPaires = 18; //nombre de paires à trouver
        this.nbPairesTrouve = 0; //variable pour le nombre de paires que l'on a trouvé
        this.difficulte = difficulte; //Récupération de la difficulté choisie sur la page d'accueil
        this.perdu = false;
        this.carte1; 
        this.carte2;
        this.chronos;
        this.vitesseSetInterval = 50; //Fréquence en ms à laquelle le setInterval va relancer la fonction en callback
        this.tempsParDefautEnMs = this.determineTempsChronos(); 
        this.timer = this.tempsChronos = this.tempsParDefautEnMs/this.vitesseSetInterval;  //On définit 2 variables égales avec le temps du chronos en ms / par la vitesse que l'on a choisi pour le set interval. On en a 2, car une va être décrémentée dans le setInterval et l'autre va nous servir de valeur de référence.
    }

    //Détermination du temps du chronos en fonction de la difficulté choisie. Le temps est exprimé en ms
    determineTempsChronos(){
        let tempsParDefautEnMs = 180000;
        switch(this.difficulte){
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
        return tempsParDefautEnMs
    }

    //Ce que l'on va faire lorsque on clique sur une carte
    selectionCarte(carteParent){
        if(!$(carteParent).hasClass('rotate-recto') && this.nbClick < 2 && !this.perdu){ //On verifie que la carte n'a pas été retournée, qu'il n'y a pas 2 autres cartes de retournées sur le plateau et qu'on a pas perdu
            if(this.nbClick === 0){ //Si on a pas encore cliqué on affecte à la carte 1
                this.carte1 = carteParent; 
            } else { //Sinon on affecte la carte 2
                this.carte2 = carteParent; 
            }

            $(carteParent).addClass('rotate-recto'); //rotation de la carte pour pouvoir la voir
            this.nbClick++;

            if(this.nbClick === 2){ //Quand on a 2 clics, c'est qu'on a retourné 2 cartes, c'est a ce moment là qu'on fait la comparaison
                let carte1Children = this.carte1.children();
                let carte2Children = this.carte2.children();

                //On ne recupère que les ids correspondant a la carte avec le fruit pour comparer les chiffres
                let idCarte1 = carte1Children[0].id.replace(regex, '');
                let idCarte2 = carte2Children[0].id.replace(regex, '');

                if(idCarte1 === idCarte2){ //Les 2 cartes sont égales
                    this.nbPairesTrouve ++;  
                    this.nbClick = 0 //On réinitialise le nombre de click pour pouvoir de nouveau retourner 2 nouvelles cartes
                    this.verifPaires(); //Pour vérifier si on a gagné ou perdu, dans le cas "neutre" / partie encore en cours il ne se passe rien et le jeu continue
                } else { //Les 2 cartes sont différentes
                    let that = this; //Création d'un alias de this puisque dans l'utilisation du settimour, this sera redéfini et on aura plus accès au this de la class
                    setTimeout(function(){
                        //On remet les cartes face cachée
                        that.carte1.removeClass('rotate-recto');
                        that.carte1.addClass('rotate-verso');
                        that.carte2.removeClass('rotate-recto');
                        that.carte2.addClass('rotate-verso');
                        that.nbClick = 0 //On réinitialise le nombre de click    
                    },1000) //set Timout = le callback ne s'executeras qu'à la fin des 1s (1000ms), permet de laisser du temps au joueur de regarder où se trouve les cartes.
                }
            } 
        }
    }

    //Fonction pour le chronos. Pour cela on va utiliser un setInterval, qui va exécuter une fonction tous les x temps.
    startChronos(){
        let that = this;
        this.chronos = setInterval(function(){
            that.timer--;
            if(that.timer === 0) that.verifPaires(); //Quand on arrive à 0, c'est que le temps est écoulé
            let widthProgressBar = that.timer*100/that.tempsChronos; //calcul pour trouver l'évolution de la barre de progression du chronos
            $('#chronos__progressbar').css('width', widthProgressBar + "%"); //barre du chronos qui défile
        },this.vitesseSetInterval)
    }

    //Fonction pour vérifier si on a trouvé toutes les paires 
    verifPaires(){
        if(this.nbPairesTrouve === this.nbPaires){ //cas ou on gagne
            clearInterval(this.chronos); //On arrête le chronos
            $('#gagne').addClass('afficherMessageFinal');
            this.enregistrerScore();
        } else if(this.timer === 0) { //cas ou on perd
            this.perdu = true; // On dit que l'on a perdu pour pouvoir bloquer le jeu au moment où l'on retourne les cartes
            clearInterval(this.chronos); //On arrête le chronos
            $('#perdu').addClass('afficherMessageFinal');
        } else {
            return true;
        }

        setTimeout(function(){
            window.location.href = "index.html"

        }, 2000)
    }
    
    //requete ajax pour sauvegarder les scores
    enregistrerScore(){
        let temps = (this.tempsParDefautEnMs - (this.timer * this.vitesseSetInterval)) / 1000; //Calcul pour savoir en combien de secondes on a fait le jeu
        //Par défaut, le pseudo est anonymous, mais si la personne à saisi son pseudo / qu'il est sauvegardé en localStorage, alors on utilise ce pseudo
        let pseudo = "Anonymous";
        if(localStorage.getItem("pseudo")){
            pseudo = localStorage.getItem("pseudo");
        }
        let data = {
            pseudo : pseudo,
            temps : temps,
            difficulte : this.difficulte
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
}

