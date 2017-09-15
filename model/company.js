var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// ─── MODULE COMPANY ─────────────────────────────────────────────────────────────
var CompanySchema = new Schema({
    name: { type: String },
    numberOfEmployees: { type: Number },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
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
        this.update({ _id: id }, { $set: updateData }, callback)
    },

    // ─── REMOVE ─────────────────────────────────────────────────────────────────────
    removeById: function(removeData, callback) {
        this.remove(removeData, callback)
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