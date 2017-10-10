
var jwt = require('jsonwebtoken');
var {User, validPassword} = require('../model/user');
var config = require('../config/db');
var userHelper = require('../helpers/users/userHelper');

module.exports.login = (req, res) => {
  User.findOne({email: req.body.email}, (err, user) => {
    if (err) throw err;
    if(!user){
      return res.status(203).send({ authenticated: false, message: "User Not Found"})
    }else{
      if(validPassword(req.body.password, user.password)){
        var token = jwt.sign({id: user._id}, config.secret);
        res.status(200).send({authenticated: true, token: token, user: userHelper.userInfo(user) })
      }else{
        res.status(203).send({authenticated: false, message: "Incorrect Password"})
      }
    }
  })
}

module.exports.authMe = (req, res) => {
  var token = req.headers['authorization']
  if(!token){
    return res.status(203).send({ authenticated: false, message: 'Token not providesd' })
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if(err)
      return res.status(203).send({ authenticated: false, message: 'failed to authenticate token'})
    User.getUser({_id: decoded.id}, (err, user) => {
      if (err) return res.status(203).send("There was a problem finding the user.");
      if(!user) return res.status(203).send({authenticated: false, message: 'User not found'});
      res.status(200).send({authenticated: true, user: userHelper.userInfo(user)})
    })
  })
}