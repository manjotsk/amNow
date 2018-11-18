var express = require("express");
var router = express.Router();
var firebase = require("../firebase");
const geolib = require("geolib");

/* GET users listing. */
router.get("/", function(req, res, next) {
  firebase
    .database()
    .ref("ambulance")
    .once("value", async snapshot => {
      console.log(snapshot.val());
      Object.keys(snapshot.val()).map(ambuName => {
        const dist = geolib.getDistance(
          {
            latitude: req.query.latitude,
            longitude: req.query.longitude
          },
          {
            latitude: snapshot.val()[ambuName].coordinates[0],
            longitude: snapshot.val()[ambuName].coordinates[1]
          }
        );
        console.log(dist);
      });

      res.send(snapshot.val());
    });
});

module.exports = router;
