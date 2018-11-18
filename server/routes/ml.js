const express = require("express");
const router = express.Router();
const shell = require("shelljs");
const exec = require("child_process").exec;
/* GET users listing. */

router.post("/", (req, res, next) => {
  const symptoms = req.body.symptoms;
  let objDiseases = {};
  for (let i = 0; i <= symptoms.length; i++) {
    exec(
      `python /home/kinkyu-sat/server/DiseaseClassifier/GuessDisease.py ${
        symptoms[i]
      }`,
      (error, stdout, stderr) => {
        // console.log(`${stdout.split(", ")[0].split(`'`)[1]}`);
        var diseaseName = stdout.split(", ")[0].split(`'`)[1];
        if (!Object.keys(objDiseases).includes(diseaseName)) {
          objDiseases[diseaseName] = 0;
        } else {
          objDiseases[diseaseName] = objDiseases[diseaseName] + 1;
          if (symptoms.length === i) {
            res.send(objDiseases);
            delete objDiseases;
          }
          console.log(objDiseases);
        }
      }
    );
  }
  // await symptoms.map(symptom =>
  //   exec(
  //     `python /Users/tathagatthapliyal/Desktop/MyGems/Projects/alphaQ/kinkyu-sat/server/DiseaseClassifier/GuessDisease.py ${symptom}`,
  //     (error, stdout, stderr) => {
  //       // console.log(`${stdout.split(", ")[0].split(`'`)[1]}`);
  //       if (
  //         !Object.keys(objDiseases).includes(
  //           stdout.split(", ")[0].split(`'`)[1]
  //         )
  //       ) {
  //         objDiseases[stdout.split(", ")[0].split(`'`)[1]] = 0;
  //       } else {
  //         objDiseases[stdout.split(", ")[0].split(`'`)[1]] =
  //           objDiseases[stdout.split(", ")[0].split(`'`)[1]] + 1;
  //       }
  //       console.log(objDiseases);
  //     }
  //   )
  // );
});

module.exports = router;
