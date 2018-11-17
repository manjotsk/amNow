const firebase = require("firebase");
const config = require("./config/config");

console.log(config);

firebase.initializeApp(config);

module.exports = firebase;
