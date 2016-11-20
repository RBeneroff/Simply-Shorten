var express = require('express');
var router = express.Router();

var Schema = require("../models/schema.js")
var Url = Schema.Url

// GET - all urlObjects
router.get('/', function(req, res) {
  Url.find({}).exec()
  .then(function(urls) {
    console.log(urls, 'grabbing them');
    res.json({urls: urls});
  })
  .catch(function(err) {
    console.log(err);
    res.status(500);
  })
});

// CREATE - add new URL
router.post('/', function(req, res) {
  var urlObj = new Url({
    longUrl: req.body.longUrl,
    newUrl: req.body.newUrl,
    origin: req.body.origin,
  })
  urlObj.save(function(err, urlObj) {
    res.send(urlObj);
  });
});

// UPDATE -  one URl Obj
router.put('/:id', function(req, res) {
  Url.findOneAndUpdate({_id: req.body._id}, req.body)
  .then(function(urlObj) {
    console.log(urlObj, 'updated');
    res.json(urlObj);
  })
  .catch(function(err) {
    console.log(err);
    res.status(500);
  })
});

// DELETE - one URL Obj
router.delete('/:id', function(req, res) {
  Url.remove({_id: req.params.id})
  .then(function(urlObj) {
    console.log(urlObj);
    res.json(urlObj);
  })
  .catch(function(err) {
    console.log(err);
    res.status(500);
  })
});

// DELETE - all history
router.delete('/', function(req, res) {
  Url.remove({urls: req.body.urls})
  .then(function(urls) {
    console.log(urls);
    res.json(urls);
  })
  .catch(function(err) {
    console.log(err);
    res.status(500);
  })
})

module.exports = router;
