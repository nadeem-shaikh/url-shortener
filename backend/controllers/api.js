//add modules
const express = require("express");
const router = express.Router();
const config = require("../config/config");


const SHORTENER_URL = config.baseURL;
const Url = require("../models/url");

var PRE_HTTP = "http://";

/*
/api/v1/getAllUrls
Fetches all the shorturls from the database
res.status code:
    404: Not Found
    500: Internal Server Error
*/
//GET request
router.get("/getAllUrls", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  Url.find()
    .select("_id url name")
    .exec()
    .then(result => {
      res.status(200).json({
        success: true,
        count: result.length,
        urlData: result.map(result => {
          return {
            _id: result._id,
            name: result.name,
            orgUrl: result.url,
            short: {
              shortUrl: SHORTENER_URL + result.name
            }
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});


/*
/api/v1/getOriginalUrl/:name
Fetches the original URL from the short url name
@param: name
res.status code:
    404: Not Found
    500: Internal Server Error
*/
//GET request
router.get("/getOriginalUrl/:name", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  Url.findOne({ name: req.params.name })
    .exec()
    .then(result => {
      if (result) {
        res.send(result);
      } else {
        res.status(404).json({
          error: "URL is invalid."
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

/*
/api/v1/generateShortUrl/
Fetches the original URL from the short url name
@param: url
res.status code:
    404: Not Found
    500: Internal Server Error
*/
//POST request
router.post("/generateShortUrl", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  req.check("url", "invalid URL").isURL();
  const validationErrors = req.validationErrors();
  if (validationErrors) {
    res.status(400).json({
      error: validationErrors
    });
  } else {
    if (!req.body.url.match(/^[a-zA-Z]+:\/\//)) {
      var reqUrl = PRE_HTTP + req.body.url;
    } else {
      var reqUrl = req.body.url;
    }
    const url = new Url({
      url: reqUrl
    });
    url
      .save()
      .then(result => {
        res.status(201).json({
          success: true,
          urlCreated: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  }
});
module.exports = router;