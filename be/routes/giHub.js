const express = require("express");
const github = express.Router();
const GithubStrategy = require("passport-github2").Strategy;
const jwt = require("jsonwebtoken");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();

gitHub.use(
  session({
    secret: process.env.GITHUB_CLIENT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

passport.use(passport.initialize());

passport.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      return done(null, profile);
    }
  )
);

gitHub.get(
  "/auth/gitHub",
  passport.authenticate("gitHub", { scope: ["user:email"] }),
  (req, res) => {
    const redirectUrl = `http://localhost:3000/cart?user=${encodeURIComponent(
      JSON.stringify(req.user)
    )}`;
    res.redirect(redirectUrl);
  }
);

gitHub.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    const user = req.user;
    console.log("USER LOG", user);

    const token = jwt.sign(user, process.env.SECRET_KEY);
    const redirectUrl = `http://localhost:3000/login?token=${encodeURIComponent(
      token
    )}`;
    res.redirect(redirectUrl);
  }
);

module.exports = github;
