var User = require('../model/user').User
var Company = require('../model/company').Company

// all user 
exports.getAllUsers = (req, res) => {
    // User.getAllUsers({}, (err, result) => {
    User.find({}).populate('company').exec((err, result) => {
        if (!err) {
            res.render('users/users', { users: result });
        } else {
            res.send(err);
        }
    })
    //     if (!err) {
    //         res.render('users/users', { users: result });
    //     } else {
    //         res.send(err);
    //     }
    // })
}

// new user path
exports.newUser = (req, res) => {
    res.render('users/newUser', { company: req.params.company_id });
}

// create new user
exports.createUser = (req, res) => {
    Company.get({ _id: req.body.company }, function(err, company_result) {
        if (!err) {
            User.create(req.body, company_result, (err, result) => {
                if (!err) {
                    return res.redirect('/users')
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
            res.render('users/showUser', { user: result })
        } else {
            res.send(err)
        }
    })
}