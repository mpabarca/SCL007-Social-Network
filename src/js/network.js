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
          console.log(user);
          let emailVerified = user.emailVerified;
          console.log(user.emailVerified)
          let photoURL = user.photoURL;
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

    //DATOS DE LA CUENTA 
    let db = firebase.firestore();
    let contenido = document.getElementById('contenido');
    if (user.emailVerified || user.providerData[0].providerId === "facebook.com"){
        var item = document.getElementById("first-view").style.display = "none"
        contenido.innerHTML = `
        <img class="imagen-perfil" src="${user.photoURL}" alt="">
        <button onclick="cerrar()">Cerrar Sesion</button>
        <p>Hola ${user.displayName} </p>
        <p>Bienvenidx a Medicina Natural</p> <br/>

            <input type="text" id="tituloPublicacion" placeholder="Ingresa titulo"> 
            <input type="text" id="textoPublicacion" placeholder="Ingresa texto"> 
            <button id="botonGuardar" onclick="guardar()">Publicar</button>                   
        `;
    }  


    //MOSTRAR COLECCION POST CON TITULO Y TEXTO DE LA PUBLICACION
    db.collection("post").onSnapshot(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
            console.log(doc.data())
            contenido.innerHTML += `
            
            <br/><br/><br/>
            <div class="comments-container">
            <ul id="comments-list" class="comments-list">
            <li>
            <div class="comment-main-level"><div class="row">
                    <img class="comment-avatar col-1" src="${user.photoURL}" alt=""> 
            <div class="comment-box col-11">
            <div class="comment-head">
            <h6 class="comment-name by-author"><a href="http://creaticode.com/blog">Name: ${doc.data().displayName} - Email: ${doc.data().email}</a></h6>
            <span>hace 20 minutos</span>
            <i class="fa fa-reply"></i>
            <i class="fa fa-heart"></i>
            </div>
            <div class="comment-content">
                    <p>Titulo: ${doc.data().titulo}</p> 
                    <p>Texto: ${doc.data().texto} </p> 
                    </div>
                    </div>
            </div></div>
            
        </li>
    </ul>
</div>
        `
        });
    });



}

/*ESTO SE MUESTRA EN CASO DE NO ESTAR LOGUEADO
apareceNousuario = () => {
    let contenido = document.getElementById('contenido');
    contenido.innerHTML = "Ingresa tus datos para acceder";
}*/

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
    // Email sent
    alert('verifica la cuenta desde tu correo')
    console.log('enviando correo')
})
    .catch(error => {
    console.log('No se envio el correo')
});
}

//GOOGLE
document.getElementById("button-google").addEventListener("click",() => {

    var provider = new firebase.auth.GoogleAuthProvider();
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


    //enviar email para verificar
    //verificar()

})

//RECUPERAR CONTRASEÑA
document.getElementById("forgot-pass").addEventListener("click",() => {
        var auth = firebase.auth();
        let email = document.getElementById('email').value;
        alert("Ingresa tu mail para reestablecer")
    auth.sendPasswordResetEmail(email)
    .then(function() {
        alert("Revisa tu correo para cambiar tu contraseña")
      // Email sent.
    }).catch(function(error) {
        console.log("No se a enviado mail")
      // An error happened.
    });
})


 //STORAGE GUARDAR DATOS EN FIRE

firebase.auth().onAuthStateChanged(function(user) {
guardar = () => {
    let tituloPublicacion = document.getElementById("tituloPublicacion").value;
    let textoPublicacion = document.getElementById("textoPublicacion").value;
    let f = new Date(); (f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear());
    
    var db = firebase.firestore(); 

    db.collection("users").doc(user.uid).set({ 
        email: user.email, 
        displayName: user.displayName
    });

    db.collection('post').add({ //AÑADIENDO EN FIRESTORE COLECCION: "POST"
        titulo : tituloPublicacion,
        texto: textoPublicacion,
        fecha: f,
        uid: user.uid,
        email: user.email, 
        displayName: user.displayName,

    })
    
    
    .then(function(docRef) {
        document.getElementById("tituloPublicacion").value = ''; //Limpiar
        document.getElementById("textoPublicacion").value = ''; // Limpiar
        console.log("Se subio a dataBase correctamente")
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}
     
    });


//LEER DATOS EN CONSOLA


 //la volvi a declarar por quE no medejaba continuaR, luego mirar con window

//db.collection('users').doc('user.uid').collection('post')