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
      let newArray = [];
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
        if (dist < req.query.distance) {
          newArray.push({
            ambuName,
            dist,
            coordinates: snapshot.val()[ambuName].coordinates
          });
          // console.log(ambuName);
        }

        console.log(dist);
      });
      res.send(newArray);

      // res.send(snapshot.val());
    });
});

module.exports = router;
