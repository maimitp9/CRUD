var User = require('../model/user').User

// all user 
exports.getAllUsers = (req, res) => {
  User.getAllUsers( (err, result) => {
    if(!err){
      res.render('users/users', {users: result});
    }else{
      res.send(err);
    }
  })
}

// new user path
exports.newUser = (req, res) => {
  res.render('users/newUser');
}

// create new user
exports.createUser = (req, res) => {
  console.log(req.body)
  User.create(req.body, (err, result) => {
    if(!err){
      return res.redirect('/users')
    }else{
      res.send(err)
    }
  })
}

// return single user json
exports.getUser = (req, res) => {
   User.getUser( {_id: req.params.id}, (err, result) => {
    if(!err){
      res.render('users/showUser', {user: result})
    }else{
      res.send(err)
    }
  })
}