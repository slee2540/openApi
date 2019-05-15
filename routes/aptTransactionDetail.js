var express = require("express");
var request = require("request");
var parseString = require("xml2js").parseString;
var router = express.Router();
require("dotenv").config();

/* GET users listing. */
router.get("/", function(req, res, next) {
  // req.query 는 Get
  // req.body 는 Post
  var pageNo = req.query.pageNo;
  var numOfRows = req.query.numOfRows;
  var date = req.query.date;
  var gu = req.query.gu;

  console.log(req.query);

  var service_key = process.env.openApiKey;
  var url =
    "http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev";
  var queryParams =
    "?" + encodeURIComponent("ServiceKey") + "=" + service_key; /* Service Key*/
  queryParams +=
    "&" +
    encodeURIComponent("pageNo") +
    "=" +
    encodeURIComponent(pageNo); /* 페이지번호 */
  queryParams +=
    "&" +
    encodeURIComponent("numOfRows") +
    "=" +
    encodeURIComponent(numOfRows); /* 한 페이지 결과 수 */
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
        // console.log("발송되었습니다.");
        // console.dir(result.response.body[0].items[0].item[0]['거래금액']);
        var data = result.response.body[0].items[0].item;
        res.status(200).send(data);
      });
    }
  );
});

module.exports = router;
