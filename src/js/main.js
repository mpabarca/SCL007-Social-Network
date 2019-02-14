import {checkAuthState, registerUser, loginUser, loginGoogle, loginFacebook, checkEmail} from '../js/auth.js';

 window.onload = () => {   
  checkAuthState((user)=>{
        if(user){
          firstView.style.display = "none";
          secondView.style.display = "block";
          //savePostFromDataBase();
        }else{
          firstView.style.display = "block";
          secondView.style.display = "none";
        }
  });
 }

//REGISTRO USUARIO VIA MAIL Y CLAVE
const registerWithEmailAndPassword = () => {
    let email = document.getElementById('email').value;
    let contrasena = document.getElementById('contrasena').value;
    registerUser(email,contrasena);
}
document.getElementById('registro').addEventListener("click",registerWithEmailAndPassword);

const loginWithEmailAndPassword = () => {
    let email = document.getElementById('email').value;
    let contrasena = document.getElementById('contrasena').value;
loginUser(email,contrasena);
}
document.getElementById('acceder').addEventListener("click",loginWithEmailAndPassword);

const loginGmail = () =>{
  alert('funciona')
  loginGoogle()
}
document.getElementById('button-google').addEventListener("click", loginGmail);

const  loginFb= () =>{
  loginFacebook()
}
document.getElementById('button-facebook').addEventListener("click", loginFb);

// CERRAR
const cerrar = () => {
  document.getElementById('log-out').style.display="block";
  document.getElementById("firstView").style.display="block";
  document.getElementById("secondView").style.display="none";
}
//document.getElementById('button-google').addEventListener("click", cerrar);

export const savePostFromDataBase = () => {  
aparece = user => {
//DATOS DE LA CUENTA 
    let db = firebase.firestore();
    let contenido = document.getElementById('contenido');
    let userMenu = document.getElementById('user-menu');
    let outMenu = document.getElementById('out-menu');
    let userPost = document.getElementById('user-post');
    if (user.emailVerified || user.providerData[0].providerId === "facebook.com"){
       
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
}
//MOSTRAR COLECCION POST CON TITULO Y TEXTO DE LA PUBLICACION
db.collection("post").orderBy("fecha", "desc").limit(10).onSnapshot(querySnapshot => {
    contenido2.innerHTML = "";
    querySnapshot.docs.forEach(doc => {
        
        //console.log(`uid USUARIO:  ${user.uid}`)// uid del usuario
        //console.log(`uid de POST:  ${doc.data().uid}`)
        if (user.uid === doc.data().uid) { //si el id del usuario registrado es igual al uid del post registrado entonces... 
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
        }
    });
});

}





contenido.addEventListener("click", savePostFromDataBase);
