var {User, deleteFile } = require('../model/user');
var Company = require('../model/company').Company;

// all user
exports.getAllUsers = (req, res) => {
    // User.getAllUsers({}, (err, result) => {
    User.find({}).populate('company').exec((err, result) => {
        if (!err) {
            res.status(200).send(result)
            // res.render('users/users', { users: result });
        } else {
            res.send(err);
        }
    })
}

// new user path
exports.newUser = (req, res) => {
  res.render('users/newUser', { company: req.params.company_id });
}
// create new user
exports.createUser = (req, res) => {
  Company.findById({ _id: req.body.company }, function(err, company_result) {
      if (!err) {
          User.create(req.body, req.file, company_result, (err, result) => {
              if (!err) {
                res.status(200).send({user: result, "success" : true})
                //return res.redirect('/companies')
              } else {
                  res.send(err)
              }
          })
      } else {
          res.send(err); // 500 error
      }
  });
}

// return single user json
exports.getUser = (req, res) => {
    User.getUser({ _id: req.params.id }, (err, result) => {
        if (!err) {
            res.status(200).send(result)
            // res.render('users/showUser', { user: result })
        } else {
            res.send(err)
        }
    })
}

//update User
exports.updateUser = (req, res) => {
    User.getUser({ _id: req.params.id }, (err, oldUser) => {
        if (!err) {
            User.updateById(req.params.id, req.body, req.file, (err, result) => {
                if(req.file && oldUser.path){
                    deleteFile(oldUser.path, (err) => {
                        if (err) console.log(err);
                    })
                }
                if (!err) {
                    res.status(200).send({ user: result, success: true })
                }
                else {
                    res.send(err)
                }
            })
            // res.render('users/showUser', { user: result })
        } else {
            res.send(err)
        }
    })
    
}

// delete user
exports.delete = (req, res) => {
    User.getUser({ _id: req.params.id}, (err, user) => {
        user.remove( (err, result) => {
            if(result.path){
                deleteFile(result.path, (err)=>{
                    if (err) throw err;
                })
            }
            if(!err){
                res.status(200).send(user)
                // res.redirect(`/company/${result.company}`)
            }else{
                res.send(err);
            }
        })
    })
}
