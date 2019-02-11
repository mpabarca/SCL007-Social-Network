document.getElementById("second-view").style.display="none";
//REGISTRO USUARIO VIA MAIL Y CLAVE
document.getElementById("registro").addEventListener("click",() => {
    let email = document.getElementById('email').value;
    let contrasena = document.getElementById('contrasena').value;
   
    firebase.auth().createUserWithEmailAndPassword(email, contrasena)
    .then(()=>{
        verificar()
    })
    .catch(error => {
        // Handle Errors here.
        if(contrasena.length <= 5) {
            alert("Ingrese contraseña de 6 dígitos o más");
        }else if (email.indexOf("@")); 
            alert("Ingrese email válido")
      });
})

//INGRESO USUARIO VIA MAIL Y CLAVE
document.getElementById("acceder").addEventListener("click",() => {
    let email2 = document.getElementById('email').value;
    let contrasena2 = document.getElementById('contrasena').value;

    firebase.auth().signInWithEmailAndPassword(email2, contrasena2)
    .then(function(){        
    })
    .catch(error => {
        // Handle Errors here.
        if(contrasena2.length <= 5) {
            alert("Ingrese contraseña de 6 dígitos o más");
        }else if (email2.indexOf("@"));
            alert("Ingrese email válido");
        // var errorCode = error.code;
        // var errorMessage = error.message;
      });
})

//OBSERVA SI ES UN USUARIO REGISTRADO
observador = () => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            aparece(user);
          // User is signed in.
          let displayName = user.displayName;
          let email = user.email;
          //console.log(user);
          let emailVerified = user.emailVerified;
          console.log(user.emailVerified)
          let photoURL = user.photoURL;
          console.log (user.photoURL)
          let isAnonymous = user.isAnonymous;
          let uid = user.uid;
          console.log(user.uid)
          let providerData = user.providerData;
          console.log (user.providerData[0].providerId)
        } else {
            console.log("No existe usuario activo")
            //apareceNousuario(); //ingresa tus datos para acceder
            }
      });
}
observador();

//APARECE INFORMACION SOLO SI EL USUARIO VERIFICA SU CUENTA CON CORREO ENVIADO AL MAIL
aparece = user => {
    //var user = user;
    document.getElementById("second-view").style.display="block";
    //DATOS DE LA CUENTA 
    let db = firebase.firestore();
    let contenido = document.getElementById('contenido');
    let userMenu = document.getElementById('user-menu');
    let outMenu = document.getElementById('out-menu');
    let userPost = document.getElementById('user-post');
    if (user.emailVerified || user.providerData[0].providerId === "facebook.com"){
        document.getElementById("first-view").style.display = "none"
        userMenu.innerHTML = "";
        outMenu.innerHTML = "";
        userMenu.innerHTML = `<img class="imagen-perfil" src="${user.photoURL}" alt="">`;
        outMenu.innerHTML = `<button id="button-log-out" onclick="cerrar()"><i id="log-out" class="fas fa-sign-out-alt"></i></button>`; 
        contenido.innerHTML = `
        <div class="container-welcome"><p>Hola ${user.displayName} </p></div>                 
        `;
        userPost.innerHTML = `
        <div class="row">
            <div class="row" id="posting">
                <div class="row"><input class="post-tittle" type="text" id="tituloPublicacion" placeholder="Ingresa titulo"></div>
                <div class="row"><input class="post-content" type="text" id="textoPublicacion" placeholder="Ingresa texto"></div>
            </div>
            <div class="row" id="select">
                <select  id="select-what"class="col-6">
                    <option value="">Elige una categoría</option> 
                    <option value="dude">Pregunta</option>
                    <option value="solution">Recomendación</option>
                </select>
                <select  id="select-social" class="col-6">
                    <option value="">Quién lo verá?</option> 
                    <option value="public">Público</option>
                    <option value="friends">Amigos</option>
                </select>
            </div>   
            <div class="row" id="save">
                <button id="botonGuardar" onclick="guardar()">Publicar</button>
            </div>
        </div>          
        `;
    } 
let bntcerrar = document.getElementById('button-log-out')
bntcerrar.addEventListener('click', function(){
    document.getElementById('log-out').style.display="block";
    document.getElementById("first-view").style.display="block";
    document.getElementById("second-view").style.display="none";

}); 
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

//MOSTRAR COLECCION POST CON TITULO Y TEXTO DE LA PUBLICACION
let contenido2 = document.getElementById('contenido2');

db.collection("post").orderBy("fecha", "desc").limit(10).onSnapshot(querySnapshot => {
    contenido2.innerHTML = "";
    querySnapshot.docs.forEach(doc => {
        
        //console.log(`uid USUARIO:  ${user.uid}`)// uid del usuario
        //console.log(`uid de POST:  ${doc.data().uid}`)
        //console.log("-----------------------------------------------------------")

        if (user.uid === doc.data().uid) { //si el id del usuario registrado es igual al uid del post registrado entonces... 
            //console.log ("Se muestre icono borrar")
            //console.log ("Se muestre icono editar")
            
            let timestamp=doc.data().fecha;
            let dateTimestamp= timestamp.seconds;
            let date = timeConverter(dateTimestamp);
            contenido2.innerHTML = contenido2.innerHTML + 
            ` <div class="comments-container">
            <ul id="comments-list" class="comments-list">
            <li>
            <div class="comment-main-level"><div class="row">
                    <img class="comment-avatar col-1" src="${doc.data().photo}" alt="">
            <div class="comment-box col-11">
            <div class="comment-head">
            <h6 class="comment-name by-author"><a href="http://creaticode.com/blog">${doc.data().displayName}</a></h6>
            <span>${date}</span>
                       
            <i class="fa fa-trash" onclick="eliminar('${doc.id}')"> </i>
            <i class="fa fa-edit" onclick="editar('${doc.id}', '${doc.data().titulo}','${doc.data().texto}')"></i>
            <i class="fa fa-reply"></i>
            <i value="+1" class="fa fa-heart" onclick="like('${doc.id}')"> ${doc.data().like}</i>           
                   
            </div>
                <div class="comment-content">
                    <p>Titulo: ${doc.data().titulo}</p>
                    <p>Texto: ${doc.data().texto} </p> 
                     
                         
                 </div>
             </div>
            </div></div>
    
            </li>
        </ul>
        </div> `

        }else{
           // console.log ("NO muestre icono borrar")
           //console.log ("NO muestre icono Editar")
           let timestamp=doc.data().fecha;
           let dateTimestamp= timestamp.seconds;
           let date = timeConverter(dateTimestamp);
            contenido2.innerHTML = contenido2.innerHTML + 
            ` <div class="comments-container">
            <ul id="comments-list" class="comments-list">
            <li>
            <div class="comment-main-level"><div class="row">
                    <img class="comment-avatar col-1" src="${user.photoURL}" alt="">
            <div class="comment-box col-11">
            <div class="comment-head">
            <h6 class="comment-name by-author"><a href="http://creaticode.com/blog">${doc.data().displayName}, ${doc.data().email}</a></h6>
            <span>${date}</span>
            
            <i class="fa fa-reply"></i>
            <i id"clickme" class="fa fa-heart"> ${doc.data().like}</i>           
                   
            </div>
                <div class="comment-content">
                    <p>Titulo: ${doc.data().titulo}</p>
                    <p>Texto: ${doc.data().texto} </p>        
                 </div>
             </div>
            </div></div>
    
        </li>
    </ul>
    </div> `
        }
    });
});


}

//CERAR SESION USUARIOS LOG
cerrar = () => {
    firebase.auth().signOut()
        console.log('Saliendo...')
}

//ENVIANDO MAIL DE VERIFICACION
verificar = () => {
    let user = firebase.auth().currentUser;
user.sendEmailVerification()
    .then(function() {
  // Email sent.
     console.log('enviando correo')
     alert("Revisa tu correo")
})
    .catch(error => {
    console.log('No se envio el correo')
});
}

//GOOGLE
document.getElementById("button-google").addEventListener("click",() => {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider)
    .then(result => {
        alert("Exito google")
        console.log(result);
    })
    .catch(error => {
        alert("Salio mal google");
        console.log(error);
        if (error.message.indexOf("exists")) {
            alert("Ya existe un usuario con el mismo email")
        }
    })
})

//FACEBOOK 
document.getElementById("button-facebook").addEventListener("click",() => {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider)
    .then(result => {
        alert("Exito facebook")
        console.log(result);
    })
    .catch(error => {
        alert("Salio mal facebook");
        console.log(error);
        if (error.message.indexOf("exists")) {
            alert("Ya existe un usuario con el mismo email")
        }
    })
})

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

 //STORAGE GUARDAR DATOS EN FIRE
firebase.auth().onAuthStateChanged( user => {
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

    
//BORRAR DATOS
eliminar = (id) => {
    var db = firebase.firestore(); 
    confirm("Estas seguro que quieres eliminarlo?")
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
