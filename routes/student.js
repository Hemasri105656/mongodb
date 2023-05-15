const express = require('express');

const router = express.Router();

const student = require('../models/student')

var mongo = require("mongodb");


router.post('/createStudent', (req, res) => 
{
   const userData = req.body;
  const db = new student();
 db.firstName = userData.firstName;
 db.lastName = userData.lastName;
db.email = userData.email;
db.mobileNumber = userData.mobileNumber;
db.password = userData.password;

db.save(function (err, userFound)
{
if (err) 
{
     response = { success: false, msg: err };
     res.json(response);
 } 
 else
  {
    response = { success: true, msg: "successfully student regiseter" };
    res.json(response);
}})

})
module.exports = router

