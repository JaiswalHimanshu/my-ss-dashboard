const express = require("express");
const jwt = require("jsonwebtoken");
const firebase = require("firebase");
const router = express.Router();
const checkAuth = require("../middleware/chech-auth");
const request = require("request");

firebase.initializeApp({
  apiKey: "AIxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxRw",
  authDomain: "xxxxxxxxxxxxxxxxxxxxxxxxx"
});

router.post("/signup", checkAuth, (req, res, next) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(req.body.email, req.body.password)
    .then(response => {
      res.send({
        usercreated: true
      });
    })
    .catch(err => {
      res.send({
        usercreated: false
      });
    });
});

router.post("/login", (req, res, next) => {
  const user = {
    username: req.body.email,
    password: req.body.password
  };
  token = jwt.sign({ user }, "secret_this_should_be_longer", {
    expiresIn: "1h"
  });

  firebase
    .auth()
    .signInWithEmailAndPassword(req.body.email, req.body.password)
    .then(response => {
      res.send({
        auth: true,
        message: "Login success",
        token: token
      });
    })
    .catch(error => {
      res.send({
        auth: false,
        message: "Incorrect Username or Password"
      });
    });
});

router.post("/graph1", checkAuth, (req, res) => {
  request.get(
    {
      url: "https://json-pull-49fc6.firebaseio.com/.json",
      json: true
    },
    (error, rese, body) => {
      res.send(body);
    }
  );
});

router.post("/graph2", checkAuth, (req, res) => {
  request.get(
    {
      url: "https://json-extract.firebaseio.com/.json",
      json: true
    },
    (error, rese, body) => {
      res.send(body);
    }
  );
});

router.post("/pendingActions", checkAuth, (req, res) => {
  request.post(
    {
      url: "http://192.168.1.15:3001/d-cs/admin/pendingDashboardActions",
      json: true
    },
    (error, rese, body) => {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        res.send(body);
      }
    }
  );
});

router.post("/updateActions", checkAuth, (req, res) => {
  console.log(req.body);
  request.post(
    {
      url: "http://192.168.1.15:3001/d-cs/admin/updateDashboardActions",
      token: req.body,
      json: true
    },
    (error, rese, body) => {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        res.send(body);
      }
    }
  );
});

router.post("/bankdetails", checkAuth, (req, res) => {
  res.json({
    accountNumber: 091237172312312,
    accountName: "Himanshu",
    ifsc: "KKBKK231223"
  });
});

module.exports = router;
