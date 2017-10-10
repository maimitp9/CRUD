var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fs = require('fs');

var UserSchema = new Schema({
    fname: { type: String },
    lname: { type: String },
    email: { type: String },
    gender: { type: String }, // 1= male, 0=female
    phone: { type: String },
    address: { type: String },
    password: {
        type: String
    },
	fieldname: String,
    encoding: String,
    mimeptype: String,
    filename: String,
    path: String,
    size: Number,
    created_at: Date,
    updated_at: Date,
    company: { type: Schema.Types.ObjectId, ref: "Company" }
});

UserSchema.pre('remove', function(next){
    var user = this;
    user.model('Company').update(
        { _id: user.company},
        { $pull: {users: user._id }},
        { multi: true },
        next
    )
})

UserSchema.statics = {
    // find all users
    getAllUsers: function(query, callback) {
        this.find(query, callback)
    },

    create: function(data, avatar, company, callback) {
        if(avatar){
            data["fieldname"] = avatar.fieldname
            data["encoding"] = avatar.encoding
            data["mimeptype"] = avatar.mimetype
            data["filename"] = avatar.filename
            data["path"] = avatar.path
            data["size"] = avatar.size
        }
        var user = new this(data);
        user.password = hashedPassword(user.password)
        
        user.save((err) => {
            if (err) throw err;
            company.users.push(user);
            company.save()
            user.save(callback);
        })
    },

    // update user
    updateById: function(id, data, avatar, callback){
        if (avatar) {
            data["fieldname"] = avatar.fieldname
            data["encoding"] = avatar.encoding
            data["mimeptype"] = avatar.mimetype
            data["filename"] = avatar.filename
            data["path"] = avatar.path
            data["size"] = avatar.size
        }
        
        this.findOneAndUpdate({ _id: id }, { $set: data }, { new: true }, callback)
    },

    // find one user
    getUser: function(query, callback) {
        this.findOne(query,{ password: 0 }, callback)
    },

}


const deleteFile = (file, callback) => {
    fs.unlink(file, (err) =>{
       callback(err);
    })
}

// hash and save a password
const hashedPassword = (password) => {
    return bcrypt.hashSync(password, 10);
 } 
    // check a password
const validPassword = (submittedPassword, hashedPassword) => {
        console.log(submittedPassword, hashedPassword)
        return bcrypt.compareSync(submittedPassword, hashedPassword);
   } 

var user = mongoose.model('User', UserSchema);

module.exports = {
    User: user,
    deleteFile,
    validPassword
}
