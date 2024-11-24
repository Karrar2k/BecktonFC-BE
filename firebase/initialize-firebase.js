require("dotenv").config();
const firebase = require("firebase-admin");
const serviceAccount = JSON.parse(process.env.FIREBASE_CLIENT_SECRET);

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_BUCKET
});


// Creating a bucket reference
const bucket = firebase.storage().bucket();
module.exports = bucket;

console.log("Firebase bucket initialized successfully");  