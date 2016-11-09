var express = require('express');
var router = express.Router();

// var Url = require('../models/schema');
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
    newurl: req.body.newUrl,
    origin: req.body.origin
  });
  urlObj.save(function(err, urlObj) {
    // console.log(urlObj, 'this is urlObj');
    res.send(urlObj);
  });
  // console.log(req.body.urlObj);
  // Url.create(req.body.urlObj)
  // .then(function(urlObj) {
  //   console.log(urlObj);
  //   res.json(urlObj);
  // })
  // .catch(function(err) {
  //   console.log(err);
  //   res.status(400);
  // })
});

// GET - one urlObj (so you can update & delete it)
// router.get('/:id', function(req, res) {
//   Url.findById(req.params.id).exec()
//   .then(function(urlObj) {
//     console.log(urlObj);
//     res.json(urlObj);
//   })
//   .catch(function(err) {
//     console.log(err);
//     res.status(500);
//   })
// });

// UPDATE -  one URl Obj
// router.put('/:id', function(req, res) {
//   Url.findOneAndUpdate({_id: req.body._id})
//   .then(function(urlObj) {
//     console.log(urlObj);
//     res.json(urlObj);
//   })
//   .catch(function(err) {
//     console.log(err);
//     res.status(500);
//   })
// });

// DELETE - one URL Obj
// router.delete('/:id', function(req, res) {
//   console.log(req.params.id);
//   Url.remove({_id: req.params.id})
//   .then(function(urlObj) {
//     console.log(urlObj);
//     res.json(urlObj);
//   })
//   .catch(function(err) {
//     console.log(err);
//     res.status(500);
//   })
// });


module.exports = router;
