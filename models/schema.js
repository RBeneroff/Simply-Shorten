var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;

var UrlSchema = new Schema({
  longUrl: String,
  newUrl: String,
  origin: String,
  field: String
  // createdAt: Date,
  // updatedAt: Date,
});

var UrlModel = mongoose.model('Url', UrlSchema);

module.exports = {
  Url : UrlModel
}
