//OBSERVA SI ES UN USUARIO REGISTRADO
export const checkAuthState = (callback) =>{
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
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
      callback(user);
    } else {
        console.log("No existe usuario activo")
        callback(null);
        //apareceNousuario(); //ingresa tus datos para acceder
        }
  });
}


//REGISTRO USUARIO VIA MAIL Y CLAVE
export const registerUser = (email, contrasena) => { 
 firebase.auth().createUserWithEmailAndPassword(email, contrasena)
    .then((user)=>{
        console.log("Usuario registrado > "+JSON.stringify(user));
    })
    .catch(error => {
        // Handle Errors here.
        if(contrasena.length <= 5) {
            alert("Ingrese contraseña de 6 dígitos o más");
        }else if (email.indexOf("@")); 
            alert("Ingrese email válido")
    });
}

//INGRESO USUARIO VIA MAIL Y CLAVE
export const loginUser = (email, contrasena) => {
    firebase.auth().signInWithEmailAndPassword(email, contrasena)
    .then(function(){        
    })
    .catch((error) => {
        // Handle Errors here.
        if(contrasena.length <= 5) {
            alert("Ingrese contraseña de 6 dígitos o más");
        }else if (email.indexOf("@"));
            alert("Ingrese email válido");
        // var errorCode = error.code;
        // var errorMessage = error.message;
      });
};

//Entrar con google
export const loginGoogle = () =>{

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
}

//FACEBOOK 

export const loginFacebook = () => {
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
}

//ENVIANDO MAIL DE VERIFICACION
export function checkEmail() {
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
}