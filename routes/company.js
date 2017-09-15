var express = require('express');
var router = express.Router();
var Company = require('../controllers/companyController')

//
// ─── API SERVER END POINT ───────────────────────────────────────────────────────
//
module.exports = (router) => {
  router.use( function( req, res, next ) {
    if ( req.query._method == 'DELETE' ) {
        // change the original METHOD
        // into DELETE method
        req.method = 'DELETE';
        // and set requested url to /user/12
        req.url = req.path;
    }     
    next(); 
});

  //
  // ─── COMPANT ROUTES ─────────────────────────────────────────────────────────────
  //
  router.get('/companies', Company.getAllCopanies), //list companies
  router.get('/company/new', Company.new), // new company
  router.post('/company/create', Company.create), // create company
  router.get('/company/:id/edit', Company.get), // edit company
  router.post('/company/:id/update', Company.update), // update company
  router.get('/company/:id', Company.get), // show company
  router.delete('/company/:id', Company.delete) // delete company
}