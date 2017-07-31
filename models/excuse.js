var mongoose = require('mongoose');
	Schema = mongoose.Schema;

var ExcuseSchema = new Schema({
	title: String,
	details: String,
	valid: Boolean
});

var Excuse = mongoose.model('Excuse', ExcuseSchema);
module.exports = Excuse;