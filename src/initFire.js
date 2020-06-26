
import firebase from 'firebase';
// Initialize Firebase
if(!firebase.apps.length){
firebase.initializeApp({
    apiKey: "AIzaSyBO-dwiVWx7iFBnazh2N3tkbZRkNwJi4J8",
    authDomain: "olsoftware.firebaseapp.com",
    databaseURL: "https://olsoftware.firebaseio.com",
    projectId: "olsoftware",
    storageBucket: "olsoftware.appspot.com",
    messagingSenderId: "749402500072",
    appId: "1:749402500072:web:2557130c1c64e3c623d25d"
  });
}

export default  firebase;

export var fireDatabase = firebase.database();
export var fireAuth = firebase.auth()