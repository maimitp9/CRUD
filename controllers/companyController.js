var Company = require('../model/company').Company;


// ─── GET ALL COMPANY ────────────────────────────────────────────────────────────
exports.getAllCopanies = (req, res) => {
    Company.getAll({},(err, result) => {
        if(!err){
            res.status(200).send(result)
           // res.render('company/company',{data: result})
        }else{
            res.send(err); // 500 error            
        }
    })
};

// ─── NEW COMPANY PAGE ───────────────────────────────────────────────────────────
exports.new = (req, res) => {
    res.render('company/newCompany')
};

// ─── EDIT COMPANY FORM ──────────────────────────────────────────────────────────
exports.edit = (req, res) =>{
    res.render('compant/editCompany')
};

/** create function to create Company. */
exports.create = function(req, res) {
    console.log(req.body)
    Company.create(req.body, function(err, result) {
        if (!err) {
            res.status(200).send({ company: result, success: true })
           // return res.redirect('/companies');           
        } else {
            return res.send(err); // 500 error
        }
    });
};


/** getCompany function to get Company by id. */
exports.get = function(req, res) {
    Company.findOne( { _id: req.params.id } )
        .populate('users')
        .exec( (err, company ) => {
            if(!err){
                if (req.route.path === "/company/:id") { // return which we have defined in route 
                   res.status(200).send(company)
                    // res.render('company/showCompany', {data: company}); // show company
                } else {
                    res.render('company/editCompany', {data: company}) // for edit edit company 
                }
            }else{
                res.send(err); // 500 error
            }
        })
};

/** updateCompany function to get Company by id. */
exports.update = function(req, res) {
    Company.updateById(req.params.id, req.body, function(err, result) {
        if (!err) {
            res.status(200).send(result)
          //  return res.redirect(`/company/${req.params.id}`)
        } else {
            return res.send(err); // 500 error
        }
    });
};

/** removeCompany function to get Company by id. */
exports.delete = function(req, res) {
    Company.findById({ _id: req.params.id }, (err, company) => {
        company.remove( (err, result) => {
            if(!err){
                res.status(200).send(company)
                //res.redirect('/companies')
            }else{
                res.send(err)
            }
        })
    })
};