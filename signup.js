
//javascript file for sign up page


// our specific firebase details NEEDED FOR FIREBASE DONT DELETE
var firebaseConfig = {
    apiKey: "AIzaSyDmPcQArOLLcis9MPFbiVOdqZsicY31Cao",
    authDomain: "medical-imaging-database.firebaseapp.com",
    projectId: "medical-imaging-database",
    storageBucket: "medical-imaging-database.appspot.com",
    messagingSenderId: "949166495113",
    appId: "1:949166495113:web:82e3260754838eb9edbd58",
    measurementId: "G-6PYG9WVTB0"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
const database = firebase.database()


function submitInfo(){
    //get all input fields
    userType= document.querySelector('input[name = "user-type"]:checked').value;
    firstName = document.getElementById('firstname').value;
    lastName = document.getElementById('lastname').value;
    //userName = document.getElementById('username').value;
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;
    password2 = document.getElementById('password2').value;
    profilePicture = "current.png";

    var checkRadioButton = document.querySelector('input[name = "user-type"]:checked');

    if(checkRadioButton == null){
        alert('Please specify whether you are a doctor or a patient.');
    } else if(validField(firstName) == false && validField(lastName) == false && validField(email) == false && validField(password) ==false){
        alert('Please complete the required fields.')
    }else  if(validField(firstName) == false || validField(lastName) == false){ 
        //checks if all fields are filled out
        alert('Please fill out all fields.');
    }else if(validEmail(email) == false){
        //checks valid email and if password longer than 6 characters
        alert('Invalid Email');
        return
    } else if(validPassword(password) ==false){
        alert('Please enter a password.');
    }

    //check if passwords match
    if(password != password2){
        alert('Passwords do not match');
        return
    }
  
    //Authorize User

    auth.createUserWithEmailAndPassword(email,password).then(function(){
        var user = auth.currentUser;

        //Add user to firebase database
        var databaseRef = database.ref();

        //creating user data
        var userData = {
            userType:userType,
            firstName:firstName,
            lastName:lastName,
            //userName:userName,
            email:email,
           // profilePicture:profilePicture,
            lastLogin:Date.now()
        }

        databaseRef.child('users/' + user.uid).set(userData);
        alert('User has been created');
        firebase
        .storage()
        .ref('users')
        .child(user.uid + profilePicture)
        .getDownloadURL()
        .then(imgUrl =>{
          console.log(imgUrl);
     });
    

    })
    .catch(function(error){
        //alert of errors
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
    })
}



//validating if email input is actually an email
function validEmail(email){
    check = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(check.test(email) == true){
        //email passes
        return true;
    } else {
        //email fails
        return false;
    }
}

//only accepting a valid password
function validPassword(password){
    //must be more than 6 characters
    if(password < 6){
        return false
    }else{
        return true
    }
}

//checking that each field is filled out
function validField(field){
    if(field == null){
        return false
    }
    if(field.length <= 0){
        return false
    } else {
        return true
    }
}