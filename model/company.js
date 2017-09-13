var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// ─── MODULE COMPANY ─────────────────────────────────────────────────────────────
var CompanySchema = new Schema({
    name: { type: String },
    numberOfEmployees: { type: Number }
});

CompanySchema.statics = {

    // ─── FIND ONE COMPANY ───────────────────────────────────────────────────────────
    get: function(query, callback) {
        this.findOne(query, callback)
    },

    // ─── FIND COMPANIES ─────────────────────────────────────────────────────────────
    getAll: function(query, callback) {
        this.find(query, callback)
    },

    // ─── UPDATE BY ID ───────────────────────────────────────────────────────────────
    updateById: function(id, updateData, callback) {
        this.update(id, { $set: updateData }, callback)
    },

    // ─── REMOVE ─────────────────────────────────────────────────────────────────────
    remove: function(removeData, callback) {
        this.remove(removeData, callback)
    },

    // ─── CREATE ─────────────────────────────────────────────────────────────────────
    create: function(data, callback) {
        var company = new this(data);
        console.log(company)
        company.save(callback)
    }
}

var company = mongoose.model('company', CompanySchema);

// ─── EXPORT SCHEMA ──────────────────────────────────────────────────────────────
module.exports = {
    Company: company
}