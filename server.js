var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var logger = require("morgan");
var request = require("request");

//Require the models & set up the port
var db = require("./models");

var PORT = 3000;

//Initialize Express
var app = express();

//Middleware Config
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

//Connect to MongoDB

mongoose.connect("mongodb://localhost/bbcArticle");

app.get("/scrape", function (req, res) {
    request("http://www.bbc.com/news", function (error, response, html) {
        var $ = cheerio.load(html);

        $(".title").each(function (i, element) {
            var title = $(element).children("a").text();
            var link = $(element).children("a").attr("href");
            if (title && link) {
                db.bbcArticle.insert({
                    title: title,
                    link: link
                });
            };
        });
        res.send("Articles Scraped");
        console.log("hey", response)
    });
});


//Listen on the Port
app.listen(3000, function() {
    console.log("App runnin on port 3000!");
});