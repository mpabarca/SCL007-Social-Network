(function(){
    const config = {
        apiKey: "AIzaSyDzLbBDkog-28DBB1ykLhIzzqdbhGRsb_E",
        authDomain: "redsocial-e2ac6.firebaseapp.com",
        databaseURL: "https://redsocial-e2ac6.firebaseio.com",
        projectId: "redsocial-e2ac6",
        storageBucket: "redsocial-e2ac6.appspot.com",
        messagingSenderId: "250121361452"
      };
      firebase.initializeApp(config);
    
    }());

    function validateEmail (stringEmail){
      var re = /\S+@\S+/;
      return re.test(stringEmail);
    }

    function validatePassword (stringPass) {
      if (stringPass.length>=6)  {
        return true
      }else if (stringPass.length<6){
        return false
      }
    }

    function createUser (stringEmail, stringPass) {
      
    }
    function verifyUser (stringEmail, stringPass) {
      
    }
    