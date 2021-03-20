var express = require('express');
var router = express.Router();
const {ensureAuthenticated} = require("../config/auth.js")

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

module.exports = router;
