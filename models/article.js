var mongoose = require("mongoose");

//Refernce to Schema Constructor

var Schema = mongoose.Schema;

//Create a new articleSchema object

var articleSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

//Creates the model via the schema above
var article = mongoose.model("article", articleSchema);

//Export article model
module.exports = article;