var express = require("express");
var request = require("request");
var parseString = require("xml2js").parseString;
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  // console.log(res,req,next)
  // console.log(req.param, req.query, req.body)
  // req.query 는 Get
  // req.body 는 Post
  var pageNo = req.query.pageNo;
  var numOfRows = req.query.numOfRows;
  var date = req.query.date;

  console.log(req.query);

  // res.render('index', { title: 'Express' });
  var service_key =
    "buLmLYdvptLpRsGxoQZZcM%2FDU%2BzPaLJSFCakumIYFGvGT%2BEbiC8ncXmaCJ8Lkb9wE4iDGS%2B1Qu4WqpnYccfDWw%3D%3D";
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
    encodeURIComponent("11200"); /* 지역코드 */
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
      // console.log("Status", response.statusCode);
      // console.log("Headers", JSON.stringify(response.headers));

      // console.log("Response Received", body);
      // var xml = "<root>Hello xml2js!</root>"
      parseString(body, function(err, result) {
        // console.dir(result.response.body[0].items[0].item);
        console.log("발송되었습니다.");
        // console.log(result.response.body[0])
        // console.log(result.response.body[0].items[0].item)
        // console.dir(result.response.body[0].items[0].item[0]['거래금액']);
        var data = result.response.body[0].items[0].item;
        res.status(200).send(data);
      });
    }
  );
});

module.exports = router;
