var express = require("express");
var aptRent = require("../model/aptRent");
var router = express.Router();

router.get("/", async function(req, res, next) {
  try {
    // 파라미터를 받아서 (년,월,거래금액,지역)을 받아서 넘겨주도록
    const aptInfo = await aptRent.find();
    // console.log(json(aptInfo));
    console.log(aptInfo[0]["법정동"]);
    aptInfo.map(item => {
      console.log(item["법정동"]);
    });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
