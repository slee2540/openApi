var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var aptRentSchema = new Schema({
  구: String,
  년: String,
  월: String,
  법정동: String,
  보증금액: String,
  아파트: String,
  전용면적: String,
  층: String
});

module.exports = mongoose.model("aptRent", aptRentSchema);
