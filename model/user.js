var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    fname: { type: String },
    lname: { type: String },
    gender: { type: String }, // 1= male, 0=female
    phone: { type: String },
    address: { type: String },
    company: { type: Schema.Types.ObjectId, ref: "Company" }
});

UserSchema.statics = {

    // find all users
    getAllUsers: function(query, callback) {
        this.find(query, callback)
    },

    create: function(data, company, callback) {
        var user = new this(data);
        user.save((err) => {
            if (err) throw err;

            company.users.push(user);
            company.save(callback);
        })
    },

    // find one user
    getUser: function(query, callback) {
        this.findOne(query, callback)
    }
}

var user = mongoose.model('User', UserSchema);

module.exports = {
    User: user
}