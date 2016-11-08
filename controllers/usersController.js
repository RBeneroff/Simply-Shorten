var express = require('express');
var router = express.Router();
var Schema = require('../models/schema.js');

// Routes
router.get('/', function(req, res) {
  res.send('WORKING?');
})


module.exports = router;
