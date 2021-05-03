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
        traitementData(response)
    },
    error : function(error){
        console.log(error)
    },
    dataType: 'json',
  })
  
function traitementData(data){
    let i=1;
    data.forEach(element => {
        console.log(element)
        let $tr = document.createElement('tr');
        
        $tr.appendChild(createTD(i));
        $tr.appendChild(createTD(element.pseudo));
        $tr.appendChild(createTD(element.temps));
        $tr.appendChild(createTD(element.difficulte));

        if(i%2 !== 0){
        $($tr).css("background-color","orange");
        $($tr).css("color","white");
        }

        $('#tbodyScore').append($tr);

        i++;
    });
}

function createTD(value){
    let $td = document.createElement('td');
    $td.appendChild(document.createTextNode(value));
    return $td;
}