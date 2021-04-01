var express = require('express');
var router = express.Router();
const {ensureAuthenticated} = require("../config/auth.js");
const User = require('../models/user.js');
var bcrypt = require('bcrypt');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/register', function(req,res) {
  res.render('register')
})

router.get('/dashboard',ensureAuthenticated,(req,res)=>{
  res.render('dashboard', {
    user: req.user
  });
})

router.get('/dashboard/manage', ensureAuthenticated, (req,res) => {
  res.render('manageSettings', {
    user: req.user
  });
})

router.post('/dashboard/manage', ensureAuthenticated, (req, res) => {
  console.log(req.body)
  const {email, age, gender, password, password2} = req.body;
  var newPass = password;
  let errors = [];

  switch(req.body.update) {
      case "updateEmail":
        if(email === req.user.email || !email) {
          errors.push({msg: "Your new email is equal to your previous. Please enter a different email"})
          res.render('manageSettings', {
            user: req.user,
            errors : errors,
            email : email,
            age: age,
            gender: gender,
            password: '',
            password2: ''
          })
        } else {
          User.findOneAndUpdate({email: req.user.email}, {$set:{email: email}}, {new: true, useFindAndModify: false}, (err, doc) => {
            if(err) {
              console.log("Something went wrong updating data")
            }
            console.log(doc);
          });
        }
        break;
      case "updateAge":
        if(age < 0 || age == req.user.age || !age) {
          errors.push({msg: "Age cannot be less than 0 or equal to your current one"})
          res.render('manageSettings', {
            user: req.user,
            errors : errors,
            email : email,
            age: age,
            gender: gender,
            password: '',
            password2: ''
          })
        } else {
          User.findOneAndUpdate({email: req.user.email}, {$set:{age: age}}, {new: true, useFindAndModify: false}, (err, doc) => {
            if(err) {
              console.log("Something went wrong updating data")
            }
            console.log(doc);
          });
        }
        break;
      case "updatePassword":
        if(password != password2 || !password || !password2) {
          errors.push({msg: "The two passwords don't match"})
          res.render('manageSettings', {
            user: req.user,
            errors : errors,
            email : email,
            age: age,
            gender: gender,
            password: '',
            password2: ''
          })
        } else {
          bcrypt.genSalt(10,(err,salt)=> 
            bcrypt.hash(newPass,salt,
                (err,hash)=> {
                    if(err) throw err;
                        //save pass to hash
                        newPass = hash;
                        User.findOneAndUpdate({email: req.user.email}, {$set:{password: newPass}}, 
                                              {new: true, useFindAndModify: false}, (err, doc) => {
                          if(err) {
                            console.log("Something went wrong updating data")
                          }
                          console.log(doc);
                        });
          }));
        }
        break;
  }

    res.redirect('/dashboard');
})

module.exports = router;
