var express = require("express");

var PORT = process.env.PORT || 8080;

var app = express();

//serve static content from "public" directory
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//import routes
var routes = require("./controllers/userController.js");

app.use(routes);

// Start listening on PORT
app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});