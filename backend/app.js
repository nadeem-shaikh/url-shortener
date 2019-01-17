//add modules
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const expressValidator = require("express-validator");
const path = require('path');

const config = require("./config/config");

const winston = require("winston");

const logger = winston.createLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: __dirname + '/system.log' })
    ]
  });

//routes var
const redirectController = require("./controllers/redirect");
const apiController = require("./controllers/api");

//connect to mongoDB with mongoose module
mongoose.connect(config.db,config.dbOptions);
const db = mongoose.connection;

//check connect to mongoDB
db.on("error", function () {
  // Log Error
  logger.log({
    level: 'error',
    message: 'Error occurred in connecting to mongoDB'
  });
});

db.once("connected", function () {
  logger.log({
    level: 'info',
    message: 'Connected to mongoDB"'
  });
});



//body-parser module

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());

//cors module
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//use routes

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname , '../frontend/dist/index.html'));
});

//Primary Route
app.use("/", redirectController);

//API Routes
app.use("/api/v1/", apiController);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
