const mongoose = require('mongoose');

var opening = mongoose.model('opening',{

       jobtitle        : {type: String},
       location        : {type: String},
       EmployementType : {type: String},
       Eligibility     : {type: String},
       Work            : {type: String},
       Note            : {type: String},
       skills          : {type: Array}
});

module.exports = {opening} ;