var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;

var urlSchema = new Schema({
  longUrl: String,
  newUrl: String,
  origin: String,
  // createdAt: Date,
  // updatedAt: Date,
});

var UrlModel = mongoose.model('Url', urlSchema);

module.exports = {
  Url : UrlModel,
}
