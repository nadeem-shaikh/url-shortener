//ad modules
const express = require("express");
const router = express.Router();

//add url model
const Url = require("../models/url");

/*
Redirects the short URL to original URL
GET request for ":name" URL
res.status code:
    404: Not Found
    500: Internal Server Error
*/
router.get("/:name", (req, res, next) => {
  Url.findOne({ name: req.params.name })
    .exec()
    .then(result => {
      if (result) {
        res.redirect(result.url);
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
module.exports = router;
