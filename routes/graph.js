var express = require("express");
var aptRent = require("../model/aptRent");
var router = express.Router();

router.get("/:type", async function(req, res, next) {
  try {
    // 파라미터를 받아서 (년,월,거래금액,지역)을 받아서 넘겨주도록
    // console.log(json(aptInfo));
    // console.log(aptInfo[0]["법정동"]);
    // aptInfo.map(item => {
    //   console.log(item["법정동"]);
    // });
    var type = req.params.type;
    var gu = req.query.gu;

    // console.log(req.params.type, aptInfo[0]["법정동"]);
    if (type == "0") {
      //지역별
      console.log(gu);
      const aptInfo = await aptRent.find({ 구: gu });
      console.log(aptInfo);
    } else if (type == "1") {
      //가격별
    } else if (type == "2") {
      //평수별
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
