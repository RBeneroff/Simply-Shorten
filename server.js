require('dotenv').config();
var express        = require('express'),
    bodyParser     = require('body-parser'),
    mongoose       = require('mongoose'),
    logger         = require('morgan'),
    port           = process.env.PORT || 3000,
    Schema         = require('./models/schema'),
    app            = express();
var path           = require('path');

var key = process.env.API_KEY;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));

mongoose.Promise = global.Promise;
var mongoURI =  process.env.MONGODB_URI || 'mongodb://localhost/simply-shorten';
mongoose.connect(mongoURI);
var db = mongoose.connection;

db.on('error', function(err){
  console.log(err);
});
db.once('open', function() {
  console.log("database connected!");
});

app.use(express.static(path.join(__dirname, 'public')));

var urlsController = require("./controllers/urlsController.js");
app.use('/urls', urlsController);

app.listen(process.env.PORT || 3000, function() {
console.log('I HERE ---> 3000');
});
