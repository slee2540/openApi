var express = require("express");
var request = require("request");
var parseString = require("xml2js").parseString;
var router = express.Router();
require("dotenv").config();

router.get("/", function(req, res, next) {
  var date = req.query.date;
  var gu = req.query.gu;

  console.log(req.query);

  var service_key = process.env.openApiKey;

  var url =
    "http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptRent";

  var queryParams =
    "?" + encodeURIComponent("ServiceKey") + "=" + service_key; /* Service Key*/
  queryParams +=
    "&" +
    encodeURIComponent("LAWD_CD") +
    "=" +
    encodeURIComponent(gu); /* 지역코드 */
  queryParams +=
    "&" +
    encodeURIComponent("DEAL_YMD") +
    "=" +
    encodeURIComponent(date); /* 계약월 */

  request(
    {
      url: url + queryParams,
      method: "GET"
    },
    function(error, response, body) {
      parseString(body, function(err, result) {
        // console.log("Reponse received", result.response.body[0]);
        // console.log("발송되었습니다.");
        // console.dir(result.response.body[0].items[0].item[0]['거래금액']);
        var data = result.response.body[0].items[0].item;
        // console.log(data);
        res.status(200).send(data);
      });
    }
  );
});

module.exports = router;
