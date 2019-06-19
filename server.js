var express = require("express");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models/post");

var PORT = 3000;

var app = express();

//var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraper";

//app.use(logger("dev"));

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/scraper", {
  useNewUrlParser: true
});

app.get("/", function (req, res) {
  db.find().then(function (data) {
    res.render("home", {
      items: data
    });
  }).catch(err => console.log(err));
});

app.get("/scrape", function (req, res) {
  axios.get("https://www.clickhole.com/c/news").then(function (response) {
    console.log("axios sent")

    var $ = cheerio.load(response.data);


    $("article h1").each(function (i, element) {

      console.log($(this).text());
      console.log($(this).parent("a").attr("href"))

      var result = {};

      result.title = $(this).text();
      result.link = $(this).parent("a").attr("href");

      console.log(result.title)
      console.log(result.link)
      db.create(result)
        .then(function (storage) {
          console.log(storage);
        })
        .catch(function (err) {
          console.log(err)
        });

      res.send("You did it, cool, thanks.")
    })
  })
});

app.get("/populate", function (req, res) {
  db.find().then(function (data) {
    console.log(data)
    res.json(data);
    // res.render("home", {
    //   items: data
    // });

  }).catch(err => console.log(err));
})

app.delete("/delete", function(req,res){
  db.delete().then(function(data){
    res.json(data)
  })
})

app.listen(PORT, function () {
  console.log("App running on port: " + PORT);
});