//REGISTRO USUARIO VIA MAIL Y CLAVE
document.getElementById("registro").addEventListener("click",() => {
    let email = document.getElementById('email').value;
    let contrasena = document.getElementById('contrasena').value;
    
    firebase.auth().createUserWithEmailAndPassword(email, contrasena)
    .then(function(){
        verificar()
    })
    .catch(function(error) {
        
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        
        // ...
      });
})


//INGRESO USUARIO VIA MAIL Y CLAVE
document.getElementById("acceder").addEventListener("click",() => {
    let email2 = document.getElementById('email2').value;
    let contrasena2 = document.getElementById('contrasena2').value;
    firebase.auth().signInWithEmailAndPassword(email2, contrasena2).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
})


//OBSERVA SI ES UN USUARIO REGISTRADO
function observador(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            aparece(user);
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          console.log(user);
          var emailVerified = user.emailVerified;
          console.log(user.emailVerified)
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // ...
        } else {
            console.log("No existe usuario activo")
            apareceNousuario();
          // User is signed out.
          // ...
        }
      });
}
observador();


//APARECE INFORMACION SOLO SI EL USUARIO VERIFICA SU CUENTA CON CORREO ENVIADO AL MAIL
function aparece(user){
    var user = user;
    var contenido = document.getElementById('contenido');
    if (user.emailVerified){
        contenido.innerHTML = `
        <p>Bienvenido a la Red Social</p>
        <p>ver post</p>
        <p>ver post</p>
        <p>ver post</p>
        <p>ver post</p>
        <p>ver post</p>
        <button onclick="cerrar()">Cerrar sesion</button>
        `;
    }    
}

//ESTO SE MUESTRA EN CASO DE NO ESTAR LOGUEADO
function apareceNousuario(){
    var contenido = document.getElementById('contenido');
    contenido.innerHTML = "Ingresa tus datos para acceder";
}

//CERAR SESION USUARIOS LOG
function cerrar() {
    firebase.auth().signOut()
    .then()(function(){
        console.log('Saliendo...')
    })
    .catch()(function(error){
        console.log(error)
    })
}

//ENVIANDO MAIL DE VERIFICACION
function verificar(){
    var user = firebase.auth().currentUser;
user.sendEmailVerification().then(function() {
  // Email sent.
  console.log('enviando correo')
}).catch(function(error) {
  // An error happened.
});
}