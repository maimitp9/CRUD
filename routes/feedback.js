var express = require('express')
var router = express.Router();
var Feedback = require('../controllers/feedbackController')

module.exports = (router) =>{
  router.get('/feedbacks', Feedback.getAll),
  router.post('/feedback/create', Feedback.create),
  router.post('/company/feedbacks',Feedback.getFeedbackByCompany),
  router.post('/user/feedbacks',Feedback.getFeedbackByUser)  
}