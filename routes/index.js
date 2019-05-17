var express = require("express");
var aptRent = require("../model/aptRent");
var request = require("request");
var parseString = require("xml2js").parseString;
var router = express.Router();

require("dotenv").config();

var date = [
  "201801",
  "201802",
  "201803",
  "201804",
  "201805",
  "201806",
  "201807",
  "201808",
  "201809",
  "201810",
  "201811",
  "201812"
];

var gu = ["11200", "11215", "11710", "11440"];

router.get("/", function(req, res, next) {
  var service_key = process.env.openApiKey;
  var queryParams =
    "?" + encodeURIComponent("ServiceKey") + "=" + service_key; /* Service Key*/

  var url =
    "http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptRent";

  gu.map(guStr => {
    date.map((dateStr, index) => {
      // console.log(gu, date);
      queryParams +=
        "&" +
        encodeURIComponent("LAWD_CD") +
        "=" +
        encodeURIComponent(guStr); /* 지역코드 */
      queryParams +=
        "&" +
        encodeURIComponent("DEAL_YMD") +
        "=" +
        encodeURIComponent(dateStr); /* 계약월 */

      request(
        {
          url: url + queryParams,
          method: "GET"
        },

        function(error, response, body) {
          parseString(body, function(err, result) {
            if (result == undefined || result == null) return null;

            var data = result.response.body[0].items[0].item;
            console.log(data);
            data.map(item => {
              var apt = new aptRent();
              // console.log(typeof item["법정동"], String(item["법정동"]));
              apt["구"] = guStr;
              apt["년"] = String(item["년"]);
              apt["월"] = String(item["월"]);
              apt["법정동"] = String(item["법정동"]);
              apt["보증금액"] = String(item["보증금액"]);
              apt["아파트"] = String(item["아파트"]);
              apt["전용면적"] = String(item["전용면적"]);
              apt["층"] = String(item["층"]);
              apt.save();
            });
          });
        }
      ); //end request
    });
  });

  res.send("디비에 값을 저장하는중입니다.");
});

module.exports = router;
