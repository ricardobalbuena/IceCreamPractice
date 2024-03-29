var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost/nodeauth');

var db = mongoose.connection;

// User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index: true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	name: {
		type: String
	},
	profileimage:{
		type: String
	}
});

//Orden Schema
var OrdenSchema = mongoose.Schema({
	nombre: {
		type: String
	},
	tamano: {
		type: String
	},
	sabor: {
		type: String
	},
	tiempo: {
		type: String
	},
	status:{
		type: Boolean,
        index: false
	}
});


var User = module.exports = mongoose.model('User', UserSchema);
var OrdenSchema = module.exports = mongoose.model('User1', OrdenSchema);

module.exports.createUser1 = function (newUser1, callback){
	newUser1.save(callback);
}


module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	callback(null, isMatch);
	});
}

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
    	bcrypt.hash(newUser.password, salt, function(err, hash) {
   			newUser.password = hash;
   			newUser.save(callback);
    	});
	});
}
