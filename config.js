const firebase = require("firebase");
const firebaseConfig = {
  apiKey: "AIzaSyBc9wv0DG0AwAx_m8Sxm7c4QkhUjjsjk98",
  authDomain: "beanscene-ae8c1.firebaseapp.com",
  databaseURL: "https://beanscene-ae8c1-default-rtdb.firebaseio.com",
  projectId: "beanscene-ae8c1",
  storageBucket: "beanscene-ae8c1.appspot.com",
  messagingSenderId: "1091471597933",
  appId: "1:1091471597933:web:a614faca65e29fef573a64"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const User = db.collection("users");
const Category = db.collection("categories");
const Dishes = db.collection("dishes");
const Orders = db.collection("orders");
module.exports = { User, Category, Dishes, Orders };
