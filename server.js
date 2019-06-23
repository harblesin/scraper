//All needed modules are imported
var express = require("express");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("./models");

//Sets the port to an environmental for deployment
var PORT = process.env.PORT || 3000;

//Pulling in express for further use
var app = express();

//Defines the variable for deployment using the MongoDB addon on heroku
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraper";

//Middleware
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());

//Pulling in the handlebars module and telling which engine to use in the app
var exphbs = require("express-handlebars");
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

//Telling the server where to find static files
app.use(express.static("public"));

//Connecting to mongoDB heroku addon
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true
});

//Default endpoint which renders the handlebars, and waits for data
app.get("/", function(req, res) {
  db.Post.find()
    .then(function(data) {
      res.render("home", {
        items: data
      });
    })
    .catch(err => console.log(err));
});

//Scrape endpoint, scrapes the defined url when hit, putting the chosen data into
//an object to push into the db
app.get("/scrape", function(req, res) {
  axios.get("https://www.clickhole.com/c/news").then(function(response) {
    console.log("axios sent");

    //Loads the page with cheerio
    var $ = cheerio.load(response.data);
    //Filters out h1 tags without a parent <a> tag, due to the layout of the site page
    var links = $("h1").filter(function(i, element) {
      return $(this).parent("a").length > 0;
    });

    //For each of the new filtered array, puts the grabbed text in the elemeents
    //and pushes them into the result object, which then is put into the Post collection,
    //formatted using its model
    links.each(function(i, element) {
      var result = {};

      result.title = $(this).text();
      result.link = $(this)
        .parent("a")
        .attr("href");

      db.Post.create(result)
        .then(function(storage) {
          console.log(storage);
        })
        .catch(function(err) {
          console.log(err);
        });
    });
    res.send("You did it, cool, thanks.");
  });
});

//Route for when an Article is clicked, uses the id to populate
//the note field in the model, so it can be later associated with it when
// a note is made on it
app.get("/scrape/:id", function(req, res) {
  console.log("Hitting the gEt");
  db.Post.findOne({
    _id: req.params.id
  })
    .populate("note")
    .then(function(data) {
      console.log(data);
      res.json(data);
    })
    .catch(function(err) {
      res.json(err);
    });
});

//Using the previously grabbed id once again, this is the endpoint for creating a new note
//attached to said id, and article with said id
app.post("/scrape/:id", function(req, res) {
  db.Note.create(req.body)
    .then(function(noteData) {
      return db.Post.findOneAndUpdate(
        {
          _id: req.params.id
        },
        {
          note: noteData._id
        },
        {
          new: true
        }
      );
    })
    .then(function(postData) {
      res.json(postData);
    })
    .catch(function(err) {
      res.json(err);
    });
});

//Route for deleting everything in both DBs, made with nested promises
app.delete("/delete", function(req, res) {
  db.Post.deleteMany()
    .then(function() {})
    .then(function() {
      db.Note.deleteMany().then(function(data) {
        res.json(data);
      });
    });
});

app.listen(PORT, function() {
  console.log("App running on port: " + PORT);
});
