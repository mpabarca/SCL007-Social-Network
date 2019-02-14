
 //STORAGE GUARDAR DATOS EN FIRE
 window.onload = () => { 
    firebase.auth().onAuthStateChanged = ( user => {
    guardar = () => {
    let tituloPublicacion = document.getElementById("tituloPublicacion").value;
    let textoPublicacion = document.getElementById("textoPublicacion").value;
    let fechaPublicacion = new Date();

     var db = firebase.firestore(); 

    db.collection("users").doc(user.uid).set({ 
        email: user.email, 
        displayName: user.displayName,
    });

    db.collection('post').add({ //AÑADIENDO EN FIRESTORE COLECCION: "POST"
        titulo : tituloPublicacion,
        texto: textoPublicacion,
        fecha: fechaPublicacion,
        uid: user.uid,
        email: user.email, 
        displayName: user.displayName,
        comentarios : 0,
        like: 0, 
        photo: user.photoURL

    })

    .then(docRef => {
        document.getElementById("tituloPublicacion").value = ''; //Limpiar
        document.getElementById("textoPublicacion").value = ''; // Limpiar
        console.log("Se subio a dataBase correctamente")
    })
    .catch(error => {
        console.error("Error adding document: ", error);
    });
    }
     
    });
}

//FUNCION PARA CONVERTIR TIMESTRAMP A FECHA HUMANA
function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min ;
    return time;
  }




//RECUPERAR CONTRASEÑA
document.getElementById("forgot-pass").addEventListener("click",() => {
        var auth = firebase.auth();
        let email = document.getElementById('email').value;
        alert("Ingresa tu mail para reestablecer")
    auth.sendPasswordResetEmail(email)
    .then( () => {
        alert("Revisa tu correo para cambiar tu contraseña")
      // Email sent.
    }).catch(error  => {
        console.log("No se a enviado mail")
      // An error happened.
    });
})

//BORRAR DATOS
var eliminar ="";
eliminar = (id) => {
    var db = firebase.firestore(); 
    confirm("¿Estas seguro que quieres eliminarlo?")
    db.collection("post").doc(id).delete()
        .then(() => {
        console.log("Post borrado");
    }).catch(error => {
        console.error("Error removing document: ", error);
    });
}

//EDITAR DATOS
function editar(id, tituloPublicacion, textoPublicacion){
    document.getElementById('tituloPublicacion').value = tituloPublicacion;
    document.getElementById('textoPublicacion').value = textoPublicacion;
    var boton = document.getElementById('botonGuardar');
    boton.innerHTML = "Editar";

    boton.onclick = function(){
        var db = firebase.firestore(); 
        let washingtonRef = db.collection("post").doc(id);
        // Set the "capital" field of the city 'DC'

        var tituloPublicacion = document.getElementById('tituloPublicacion').value;
        var textoPublicacion = document.getElementById('textoPublicacion').value;
        
        return washingtonRef.update({
            titulo: tituloPublicacion,
            texto: textoPublicacion,
        })
        .then(function() {
            console.log("Document successfully updated!");
            boton.innerHTML = "Publicar"
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }    
}


/*/CERAR SESION USUARIOS LOG

cerrar = () => {
    firebase.auth().signOut()
        console.log('Saliendo...')
}*/

//LIKES
var postDivs = document.querySelectorAll('.post');

function getLikeCount(postID) {
    var thisPostRef = new Firebase(firebaseURL + postID + '/like-count/');
    thisPostRef.once('value', function(snapshot) {
        if ( snapshot.val() ) {
            document.querySelector('#' + postID + ' .like-count').innerHTML = snapshot.val() + ' likes';
        } else {
            return false;
        }
    });
}
for (var i = 0; i < postDivs.length; i++) {
    var postID = postDivs[i].id;
    var numLikes = getLikeCount(postID);
}
function likePost(uid) {
    var postRef = new Firebase(firebaseURL + uid);
    postRef.child('like-count').once('value', function(snapshot) {
        var currentLikes = snapshot.val() ? snapshot.val() : 0;
        postRef.update({
            'postID': id,
            'like-count': currentLikes + 1
            }, function(error) {
              if (error) {
                console.log('Data could not be saved:' + error);
              } else {
                console.log('Data saved successfully');
              }
            });
        getLikeCount(uid);
    });   
}