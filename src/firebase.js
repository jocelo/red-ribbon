import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyCdATViY-7p92x2_Mz6wDz7Y2zIflTlCqY",
    authDomain: "redribbon-2e915.firebaseapp.com",
    databaseURL: "https://redribbon-2e915.firebaseio.com",
    projectId: "redribbon-2e915",
    storageBucket: "redribbon-2e915.appspot.com",
    messagingSenderId: "717916794523",
    appId: "1:717916794523:web:e7a8c227d979381dbba03e",
    measurementId: "G-YP5EP6M884"
}

firebase.initializeApp(config);
firebase.analytics();

export default firebase;