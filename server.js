// require express and other modules
var express = require('express');
var app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    woops_i_has_forgot_to_document_all_my_endpoints: false, // CHANGE ME, changed ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/RettBehrens/express_self_api/README.md", // CHANGE ME, changed
    base_url: "https://shrouded-cove-11909.herokuapp.com/", // CHANGE ME, changed
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"}, // CHANGE ME
      {method: "GET", path: "/api/excuses", description: "View all of my excuses at once"},
      {method: "GET", path: "/api/excuses/:title", description: "View a specific excuse by title"},
      {method: "POST", path: "/api/excuses", description: "Create a new excuse"}, // CHANGE ME
      {method: "PUT", path: "/api/excuses/:title", description: "Update an existing excuse"},
      {method: "DELETE", path: "/api/excuses/:title", description: "That's no excuse, DELETE that excuse (by title)"}
    ]
  });
});

//PROFILE
app.get('/api/profile', function(req, res) {
  res.json({
    name: "Everett",
    goes_by: "Rett",
    morning_person: false,
    github_link: "https://github.com/RettBehrens",
    github_profile_image: "https://avatars1.githubusercontent.com/u/28675148?v=4&s=460",
    current_city: "Denver",
    pets: [{name: "Loki", type: "Dog", breed: "Entlebucher Sennenhund"}, {name: "Rock", type: "Rock", breed: "Rock"}]
  });
});

//GET or SHOW, all excuses
app.get('/api/excuses', function(req, res) {
  db.Excuse.find(function(err, excuses) {
    if (err) {
      return console.log("Couldn't find any excuses: " + err);
    }
    res.json(excuses);
  });
});

//GET or SHOW, excuse by title
app.get('/api/excuses/:title', function(req, res) {
  db.Excuse.findOne({title: req.params.title}, function(err, excuse) {
    if (err) {
      return console.log("That's not a valid excuse: " + err);
    }
    res.json(excuse);
  });
});

//POST or CREATE, new excuse
app.post('/api/excuses', function(req, res) {
  var newExcuse = new db.Excuse({
    title: req.body.title,
    details: req.body.details,
    valid: req.body.valid
  });
  newExcuse.save(function(err, excuse) {
    if (err) {
      return console.log("Could not make new excuse: " + err);
    }
    res.json(excuse);
  });
});

//PUT or UPDATE, excuse by title
app.put('/api/excuses/:title', function (req, res) {
  db.Excuse.findOne({title: req.params.title}, function(err, excuse) {
    excuse.title = req.body.title;
    excuse.details = req.body.details;
    excuse.valid = req.body.valid;
    excuse.save(function(err, excuse) {
      if (err) {
        return console.log("Could not update excuse: " + err);
      }
      res.json(excuse);
    });
  });
});

//DELETE, excuse by title
app.delete('/api/excuses/:title', function (req, res) {
  db.Excuse.findOneAndRemove({title: req.params.title}, function(err, deletedExcuse) {
    if (err) {
      return console.log("Could not get rid of excuse: " + err);
    }
    res.json(deletedExcuse);
  });
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
