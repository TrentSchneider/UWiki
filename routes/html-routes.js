// Requiring path to so we can use relative routes to our HTML files
// const path = require("path");
const express = require("express");
const router = express.Router();
const db = require("../models");

// // Requiring our custom middleware for checking if a user is logged in
// const isAuthenticated = require("../config/middleware/isAuthenticated");

// these routers will construct the handlebars and display them after they use the sequelize call
router.get("/", (req, res) => {
  db.Wikis.findAll().then(hbsObject => {
    res.render("index", hbsObject);
  });
});

router.get("/view/:id", (req, res) => {
  db.Wikis.findOne({
    where: {
      id: req.params.id
    }
  }).then(hbsObject => {
    // will switch out index when single view handlebars file created
    res.render("index", hbsObject);
  });
});

router.delete("/api/delete/:id", req => {
  db.Wikis.destroy({
    where: {
      id: req.params.id
    }
  }).then((res, err) => {
    if (err) {
      throw err;
    }
    res.status(200);
  });
});

router.get("/create", (req, res) => {
  // will switch out index when create form handlebars added
  res.render("index");
});

router.post("/api/create", (req, res) => {
  db.Wikis.create(
    [
      { category: req.body.category },
      { title: req.body.title },
      { description: req.body.description }
    ],
    result => {
      res.status(200).json(result.title + "has been added.");
    }
  );
});

// router.get("/", (req, res) => {
//   // If the user already has an account send them to the members page
//   if (req.user) {
//     res.redirect("/members");
//   }
//   res.sendFile(path.join(__dirname, "../public/signup.html"));
// });

// router.get("/login", (req, res) => {
//   // If the user already has an account send them to the members page
//   if (req.user) {
//     res.redirect("/members");
//   }
//   res.sendFile(path.join(__dirname, "../public/login.html"));
// });

// // Here we've add our isAuthenticated middleware to this route.
// // If a user who is not logged in tries to access this route they will be redirected to the signup page
// router.get("/members", isAuthenticated, (req, res) => {
//   res.sendFile(path.join(__dirname, "../public/members.html"));
// });

module.exports = router;
