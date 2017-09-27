var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var User = require('../model/user.js').User;

// ─── MODULE COMPANY ─────────────────────────────────────────────────────────────
var CompanySchema = new Schema({
    name: { type: String },
    numberOfEmployees: { type: Number },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

CompanySchema.pre('remove', function(next) {
    this.model('User').remove( {company: this._id}, next );
})


CompanySchema.statics = {

    // ─── FIND ONE COMPANY ───────────────────────────────────────────────────────────
    findById: function(query, callback) {
        this.findOne(query, callback)
    },

    // ─── FIND COMPANIES ─────────────────────────────────────────────────────────────
    getAll: function(query, callback) {
        this.find(query, callback)
    },

    // ─── UPDATE BY ID ───────────────────────────────────────────────────────────────
    updateById: function(id, updateData, callback) {
        this.findOneAndUpdate({ _id: id }, { $set: updateData },{ new: true}, callback)
    },

    // ─── CREATE ─────────────────────────────────────────────────────────────────────
    create: function(data, callback) {
        var company = new this(data);
        company.save(callback)
    }
}

var company = mongoose.model('Company', CompanySchema);

// ─── EXPORT SCHEMA ──────────────────────────────────────────────────────────────
module.exports = {
    Company: company
}