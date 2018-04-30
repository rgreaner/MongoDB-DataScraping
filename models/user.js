var mongoose = require("mongoose");

//Save a refernce to the Schema constructor
var Schema = mongoose.Schema;

//Using the Schema constructor, a new User Schema object is created

var userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
})