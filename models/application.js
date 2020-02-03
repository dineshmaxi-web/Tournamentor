var mongoose = require('mongoose');

var applicationSchema = mongoose.Schema({
  hostname : String,
  created_at : {type: Date , default:Date.now()},
  pnumber : String,
  groundimage : String,
  sportimage : String,
  hostemail : String,
  entryfee : String,
  sportname :  String,
  startdate : Date,
  enddate : Date,
  description : String,
  street : String,
  city : String,
  pincode : String,
  lat : String,
  lng : String
});

var application = mongoose.model('applications' , applicationSchema);

module.exports = application;
