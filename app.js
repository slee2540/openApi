var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var indexRouter = require("./routes/index");
var graph = require("./routes/graph");
var aptTransactionDetailRouter = require("./routes/aptTransactionDetail");
var aptTransactionRouter = require("./routes/aptTransaction");
var aptJunseRentRouter = require("./routes/aptJunseRent");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// CONNECT TO MONGODB SERVER
mongoose.set("useFindAndModify", false);
mongoose.Promise = global.Promise; // Node 의 네이티브 Promise 사용
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(response => {
    console.log("Successfully connected to mongodb");
  })
  .catch(e => {
    console.error(e);
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/graph", graph);
app.use("/aptTransactionDetail", aptTransactionDetailRouter);
app.use("/aptTransaction", aptTransactionRouter);
app.use("/aptJunseRent", aptJunseRentRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
