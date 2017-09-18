var express = require('express');
var router = express.Router();
var User = require('../controllers/userController')
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, './public/uploads/')
    },
    filename: function(req, file, callback){
        console.log("gfgfgfg-----------------------")
        var originalname = file.originalname
        var extension = originalname.split(".");
        filename = extension[0] + '_' + Date.now() + '.' + extension[extension.length-1];;
        callback(null, filename);
    }
})

var upload = multer({ storage: storage });

module.exports = (router) => {
    router.use((req, res, next) => {
        if (req.query._method === 'DELETE') {
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
    router.get('/user/:company_id/new', User.newUser) // new user
    router.post('/user/create',upload.single('avatar'), User.createUser) // create User
    router.delete('/user/:id/delete', User.delete) // delete user

}
