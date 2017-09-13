var express = require('express');
var router = express.Router();
var Company = require('../controllers/companyController')

//
// ─── API SERVER END POINT ───────────────────────────────────────────────────────
//
module.exports = (router) => {
  router.post('/company', Company.create),
  router.get('/company/:id', Company.get),
  router.put('/company/:id', Company.update),
  router.delete('/company/:id', Company.delete)
}