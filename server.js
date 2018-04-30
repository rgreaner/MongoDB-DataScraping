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
        

        $("a.gs-c-promo-heading").each(function (i, element) {
            var result = {};
            console.log($(element).children('h3').text());
            console.log($(element).attr("href"));

            console.log("**************************")
            // var title = $(element).children("a").text();
            // var link = $(element).children("a").attr("href");
            // if (title && link) {
            //     db.bbcArticle.insert({
            //         title: title,
            //         link: link
            //     });
            // };
            // Create a new Article using the `result` object built from scraping
            // db.article.create(result)
            //     .then(function (dbarticle) {
            //         // View the added result in the console
            //         console.log(dbarticle);
            //     })
            //     .catch(function (err) {
            //         // If an error occurred, send it to the client
            //         return res.json(err);
            //     });
        });
        res.send("Articles Scraped");
        // console.log("hey", response)
    });
});


// });
//Listen on the Port
app.listen(3000, function () {
    console.log("App running on port 3000!");
});