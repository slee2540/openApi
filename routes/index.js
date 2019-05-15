var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.send("아무것도 없습니다.");
});

module.exports = router;
