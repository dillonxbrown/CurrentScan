//logout

//const { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } = require("constants");

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

//variables
const auth = firebase.auth()
const database = firebase.database()
var user = auth.currentUser;

auth.onAuthStateChanged(function(user) {
    if (user) {
      /*getting snapshot of firstname and lastname 
      from database and updating it onto the profile*/
      console.log(user.uid);
      database.ref('/users/' + user.uid).once('value').then(function(snapshot){
        document.getElementById("full-name").innerText = snapshot.val().firstName + " " + snapshot.val().lastName;
      });
       firebase
        .storage()
        .ref('users')
        .child(user.uid + 'profile-picture.png')
        .getDownloadURL()
        .then(imgUrl =>{
          document.getElementById('profile-picture').src = imgUrl;
          console.log(imgUrl);
     });
    
      }
})



let file = {};
document.getElementById('newProfilePicture').addEventListener('change', function(e){
  file = e.target.files[0];
})
  
//update profile picture
var updateProfile = firebase.auth().onAuthStateChanged(function (user) {
  firebase
      .storage()
      .ref('users')
      .child(user.uid + 'profile-picture.png')
      .put(file);
  firebase
        .storage()
        .ref('users')
        .child(user.uid + 'profile-picture.png')
        .getDownloadURL()
        .then(imgUrl =>{
          document.getElementById('profile-picture').src = imgUrl;
          console.log(imgUrl);
     })
    })



const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    location.href = 'login.html';
    console.log('user logged out');
  });
});


//forgot password modal
var modal = document.getElementById("editProfile");

var editProfileBtn = document.getElementById("editProfileButton");

//span element that closes modal
var span = document.getElementsByClassName("close")[0];

//when user clicks button display modal

window.onload = function(){
  editProfileBtn.onclick=function(){
    modal.style.display = "block";
  }
}


//when user clicks on x close 
span.onclick = function(){
    modal.style.display = "none";
}



/*
function resetProfile(){
  var userNow = firebase.auth().currentUser;
    userNow.resetProfile({
    displayName: "Jane Q. User",
    photoURL: "https://example.com/jane-q-user/profile.jpg"
  }).then(function() {
    var displayName = userNow.displayName;
    var photoURL = userNow.photoURL;
  }, function(error) {
    window.alert("error")
  });
}*/

/*
function updateProfile(){
  var userNow = firebase.auth.currentUser;
  userNow.updateProfile({
    photoURL: document.getElementById("newProfilePicture")
  }).then(function(){
    var photoURL = userNow.photoURL;
  },function(error){
    window.alert("error")
  });
}
*/