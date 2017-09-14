var Company = require('../model/company').Company

// ─── GET ALL COMPANY ────────────────────────────────────────────────────────────
exports.getAllCopanies = (req, res) => {
    Company.getAll({},(err, result) => {
        if(!err){
            res.render('company',{data: result})
        }else{
            res.send(err); // 500 error            
        }
    })
}

// ─── NEW COMPANY PAGE ───────────────────────────────────────────────────────────

exports.new = (req, res) => {
    res.render('newCompany')
}

// ─── EDIT COMPANY FORM ──────────────────────────────────────────────────────────
exports.edit = (req, res) =>{
    res.render('editCompany')
}

/** create function to create Company. */
exports.create = function(req, res) {
    Company.create(req.body, function(err, result) {
        if (!err) {
            return res.redirect('/companies');           
        } else {
            return res.send(err); // 500 error
        }
    });
};


/** getCompany function to get Company by id. */
exports.get = function(req, res) {
    Company.get({ _id: req.params.id }, function(err, result) {
        if (!err) {
            if(req.route.path === "/company/:id"){ // return which we have defined in route
                res.render('showCompany',{data: result});
            }else{
                res.render('editCompany', {data: result})
            }
        } else {
            res.send(err); // 500 error
        }
    });
};

/** updateCompany function to get Company by id. */
exports.update = function(req, res) {
    console.log("yeah i am inside")
    Company.updateById(req.params.id, req.body, function(err, result) {
        if (!err) {
            return res.redirect(`/company/${req.params.id}`)
        } else {
            return res.send(err); // 500 error
        }
    });
}

/** removeCompany function to get Company by id. */
exports.delete = function(req, res) {
    Company.removeById({ _id: req.params.id }, function(err, result) {
        if (!err) {
            return res.json(result);
        } else {
            console.log(err);
            return res.send(err); // 500 error
        }
    });
}