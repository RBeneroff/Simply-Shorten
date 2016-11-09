var express        = require('express'),
    bodyParser     = require('body-parser'),
    mongoose       = require('mongoose'),
    logger         = require('morgan'),
    port           = process.env.PORT || 3000,
    Schema           = require('./models/schema'), //needed?
    app            = express();
var path           = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));

// var usersController = require("./controllers/users.js");
// app.use('/users', usersController);

//Mongoose
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/simply-shorten');
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
// app.use('/', require('./controllers/urlsController.js'));

// app.get('/', function(req, res) {
//   res.render('index');
// });

// app.use(function(req, res) {
//     res.sendFile(__dirname + '/public/index.html');
// });

app.listen(process.env.PORT || 3000, function() {
console.log('I HERE ---> 3000');
});
