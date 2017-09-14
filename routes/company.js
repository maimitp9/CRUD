var express = require('express');
var router = express.Router();
var Company = require('../controllers/companyController')

//
// ─── API SERVER END POINT ───────────────────────────────────────────────────────
//
module.exports = (router) => {
  router.post('/company', Company.create),
  router.get('/company/:id', Company.get),
  router.post('/update-company/:id', Company.update),
  router.delete('/company/:id', Company.delete),
  router.get('/companies', Company.getAllCopanies),
  router.get('/newCompany', Company.new),
  router.get('/editCompany/:id', Company.get)
}