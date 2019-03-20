var express = require("express");

var router = express.Router();

//import the model burger.js to use for database
var burger = require("../models/burger.js");

//create all routes
router.get("/", function(req, res) {
  burger.all(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject.burgers[0].name + " hbsObject");
    console.log("message")
    res.render("index", hbsObject);
  });
});

router.post("/api/Burgers", function(req, res) {
  burger.create(["name", "eaten"], [req.body.name, req.body.eaten], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/Burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update(
    {
      eaten: req.body.eaten
    },
    condition,
    function(result) {
      if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();

    }
  );
});

//export routes for server.js to use.
module.exports = router;
