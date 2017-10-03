var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FeedbackSchema = new Schema(
  {
    text: {type: String},
    company: {type: Schema.Types.ObjectId, ref: 'Company'},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
  }
)

FeedbackSchema.statics = {
  getAllFeedback: function(query, callback){
    this.find(query,callback)
  },

  createFeedback: function(body, callback){
    var feedback = new this(body);
    feedback.save(callback)
  },

  getByCompany: function(company, callback){
    this.find({company: company}).populate('user').exec(callback)
  },

  getByUser: function(user, callback){
    this.find({user: user}, callback)
  }
}

var feedback = mongoose.model('Feedback', FeedbackSchema)

module.exports = {
  Feedback: feedback
}