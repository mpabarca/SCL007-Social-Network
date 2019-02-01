function register(){
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
       
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        
        // ...
      });
}

function entry(){
    const email2 = document.getElementById("email2").value;
    const password2 = document.getElementById("password2").value;

    firebase.auth().createUserWithEmailAndPassword(email2, password2).catch(function(error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        console.log(errorCode);
        console.log(errorMessage);
        // ...
      });
}

function viewer(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log("si existe usuario")
            aparece()
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // ...
        } else {
          // User is signed out.
          console.log("no existe usuario")
          // ...
        }
      });
}
viewer();

function aparece(){
    const container = document.getElementById("container");
    container.innerHTML= `
    <p>Bienvenido</p>
    <button onclick="close()">Cerrar Sesión</button>
    `;
}
function close(){
    firebase.auth().singOut()
    .then(function(){
        console.log(saliendo)
    })
    .catch(function(error){
        console.log(error)
    })
}