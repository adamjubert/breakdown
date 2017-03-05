const Game = require("./game");

// Initialize Firebase
var config = {
  apiKey: "AIzaSyC7aTjQHH9a9p1iQT96Xua837KJ4t2Aboc",
  authDomain: "gong-34d06.firebaseapp.com",
  databaseURL: "https://gong-34d06.firebaseio.com",
  storageBucket: "gong-34d06.appspot.com",
  messagingSenderId: "77466642516"
};
firebase.initializeApp(config);
var database = firebase.database();

const canvas = document.getElementsByTagName('canvas')[0];
canvas.width = 900;
canvas.height = 550;
const context = canvas.getContext('2d');
const game = new Game(context);
window.addEventListener('keydown',game.toggleSound.bind(game),false);
