//Dans le cas où l'utilisateur saisis un pseudo, on le sauvegarde dans un localstorage (permet le stockage de la donnée dans le navigateur web)
$('#pseudo').focusout(function(){
    console.log(this.value.length)
    if(this.value.length>0){
        localStorage.setItem("pseudo", this.value)
    } 
})

//Si il y a un pseudo sauvegarder en localStorage, on prérempli le input du pseudo
if(localStorage.getItem("pseudo")){
    console.log("ici")
    $('#pseudo').val(localStorage.getItem("pseudo"));
}



$.ajax({
    type: "GET",
    url: "http://localhost:3000/",
    success: function(response){
        console.log(response)
    },
    error : function(error){
        console.log(error)
    },
    dataType: 'json',
  })