var express = require("express");
var router = express.Router();
var firebase = require("../firebase");

/* GET users listing. */
router.get("/", function(req, res, next) {
  firebase
    .database()
    .ref("ambulance")
    .once("value", snapshot => {
      res.send(snapshot.val());
    });
});

module.exports = router;
