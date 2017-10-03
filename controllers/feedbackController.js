var Feedback = require('../model/feedback').Feedback;

exports.getAll = (req, res) =>{
  Feedback.getAllFeedback({}, function(err, result){
    if(!err){
      res.send(result)
    }else{
      res.send(err)
    }
  })
}

exports.create = (req,res) => {
  console.log(req.body)
  Feedback.createFeedback(req.body, function(err, result){
    if(!err){
      res.status(200).send({feedback: result, success: true})
    }else{
      res.send(err);
    }
  })
}

exports.getFeedbackByCompany = (req, res) => {
  Feedback.getByCompany(req.body.company_id, (err, result) => {
    if(!err){
      res.status(200).send({feedback: result, success: true})
    }else{
      res.send(err);
    }
  })
}

exports.getFeedbackByUser = (req, res) => {
  Feedback.getByUser(req.body.user_id, (err, result) => {
    if(!err){
      res.status(200).send({feedback: result, success: true})
    }else{
      res.send(err)
    }
  })
}