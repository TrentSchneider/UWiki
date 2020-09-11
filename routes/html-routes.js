// Requiring path to so we can use relative routes to our HTML files
// const path = require("path");
const express = require("express");
const router = express.Router();
const db = require("../models");
const passport = require("../config/passport");

// // Requiring our custom middleware for checking if a user is logged in
// const isAuthenticated = require("../config/middleware/isAuthenticated");

// these routers will construct the handlebars and display them after they use the sequelize call

// route for main page that grabs all wikis
router.get("/", (req, res) => {
  if (req.user) {
    const user = { user: true };
    db.wikis.findAll().then((data) => {
      const hbsObject = { wikis: data, user: user };
      res.render("index", hbsObject);
    });
  }
  db.wikis.findAll().then((data) => {
    const hbsObject = { wikis: data };
    res.render("index", hbsObject);
  });
});

// route for the main page that grabs the wikis for the category chosen in the dropdown
router.get("/category/:category", (req, res) => {
  db.wikis
    .findAll({
      where: {
        category: req.params.category,
      },
    })
    .then((data) => {
      if (req.user) {
        const hbsObject = { wikis: data, user: true };
        res.render("index", hbsObject);
      }
      const hbsObject = { wikis: data };
      res.render("index", hbsObject);
    });
});

// route for the view page that displays the wiki for the id that matches the button's data-id
router.get("/view/:id", (req, res) => {
  db.wikis
    .findOne({
      where: {
        id: req.params.id,
      },
    })
    .then((data) => {
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

router.get("/signup", (req, res) => {
  // will switch out index when about handlebars added
  res.render("signup");
});

router.get("/login", (req, res) => {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect("/");
  }
  // will switch out index when login form handlebars added
  res.render("login");
});

// // The isAuthenticated can be added to the home page route so that handlebars can pick whether they are able to create/edit pages or not
// // Here we've add our isAuthenticated middleware to this route.
// // If a user who is not logged in tries to access this route they will be redirected to the signup page
// router.get("/members", isAuthenticated, (req, res) => {
//   res.sendFile(path.join(__dirname, "../public/members.html"));
// });

router.delete("/api/delete/:id", (req) => {
  db.wikis
    .destroy({
      where: {
        id: req.params.id,
      },
    })
    .then((res, err) => {
      if (err) {
        throw err;
      }
      res.status(200);
    });
});

router.post("/api/create", (req, res) => {
  console.log("api/create", req.body);
  db.wikis.create(
    {
      category: req.body.category,
      title: req.body.title,
      description: req.body.description,
    },
    (result) => {
      res.status(200).json(result.title + "has been added.");
    }
  );
});

// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
router.post("/api/login", passport.authenticate("local"), (req, res) => {
  // Sending back a password, even a hashed password, isn't a good idea
  res.json({
    email: req.user.email,
    id: req.user.id,
  });
});

// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
router.post("/api/signup", (req, res) => {
  db.User.create({
    email: req.body.email,
    password: req.body.password,
  })
    .then(() => {
      res.redirect(307, "/api/login");
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});

// Route for logging user out
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// Route for getting some data about our user to be used client side
router.get("/api/userData", (req, res) => {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id,
    });
  }
});

module.exports = router;
