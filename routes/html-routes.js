const express = require("express");
const router = express.Router();
const db = require("../models");
const passport = require("../config/passport");

// these routers will construct the handlebars and display them after they use the sequelize call

// route for main page that grabs all wikis
router.get("/", (req, res) => {
  if (req.user) {
    const user = { user: true };
    db.wikis.findAll().then(data => {
      const hbsObject = { wikis: data, user: user };
      res.render("index", hbsObject);
    });
  } else if (!req.user) {
    db.wikis.findAll().then(data => {
      const hbsObject = { wikis: data };
      res.render("index", hbsObject);
    });
  }
});

// ** For future development
// route for the main page that grabs the wikis for the category chosen in the dropdown
router.get("/category/:category", (req, res) => {
  db.wikis
    .findAll({
      where: {
        category: req.params.category
      }
    })
    .then(data => {
      if (req.user) {
        const hbsObject = { wikis: data, user: true };
        res.render("index", hbsObject);
      }
      const hbsObject = { wikis: data };
      res.render("index", hbsObject);
    });
});

// route for the view page that displays the wiki for the id that matches the selected wiki
router.get("/view/:id", (req, res) => {
  db.wikis
    .findOne({
      where: {
        id: req.params.id
      }
    })
    .then(data => {
      if (req.user) {
        const hbsObject = { wikis: data, user: true };
        res.render("viewWiki", hbsObject);
      }
      const hbsObject = { wikis: data };
      res.render("viewWiki", hbsObject);
    });
});

// route for the wiki creation form
router.get("/create", (req, res) => {
  if (req.user) {
    const user = { user: true };
    res.render("createWiki", user);
  } else if (!req.user) {
    res.redirect("/");
  }
});

// route for the about page
router.get("/about", (req, res) => {
  if (req.user) {
    const user = { user: true };
    res.render("about", user);
  }
  res.render("about");
});

// Route for the signup form
router.get("/signup", (req, res) => {
  res.render("signup");
});

// Route for login page
router.get("/login", (req, res) => {
  if (req.user) {
    res.redirect("/");
  }
  res.render("login");
});

// ** For future development
// route to delete wikis
router.delete("/api/delete/:id", req => {
  db.wikis
    .destroy({
      where: {
        id: req.params.id
      }
    })
    .then((res, err) => {
      if (err) {
        throw err;
      }
      res.status(200);
    });
});

// API route for creating a wiki
router.post("/api/create", (req, res) => {
  console.log("api/create", req.body);
  db.wikis
    .create({
      category: req.body.category,
      title: req.body.title,
      description: req.body.description
    })
    .then(() => {
      // res.status(200).json(result.title + "has been added.");
      console.log("add complete");
      res.redirect("/");
    });
});

// route for the API login that also uses passport authentication
router.post("/api/login", passport.authenticate("local"), (req, res) => {
  res.json({
    email: req.user.email,
    id: req.user.id
  });
});

// route for API signup
router.post("/api/signup", (req, res) => {
  db.User.create({
    email: req.body.email,
    password: req.body.password
  })
    .then(() => {
      res.redirect(307, "/api/login");
    })
    .catch(err => {
      res.status(401).json(err);
    });
});

// Route for logging user out
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// ** For future development
// Route for getting some data about our user to be used client side
router.get("/api/userData", (req, res) => {
  if (!req.user) {
    res.json({});
  } else {
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  }
});

module.exports = router;
