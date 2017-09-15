var express = require('express');
var router = express.Router();
var User = require('../controllers/userController')


module.exports = (router) => {
  router.use( (req,res,next) => {
    if(req.query._method === 'DELETE'){
      req.method = 'DELETE';
      req.url = req.path;
    }
    next();
  });

  //
  // ─── USERS PATH ─────────────────────────────────────────────────────────────────
  //
  router.get('/users', User.getAllUsers) // get user list
  router.get('/user/:id/profile', User.getUser) // get single requested user
  router.get('/user/new', User.newUser) // new user
  router.post('/user/create', User.createUser) // create User

}
