var express = require('express');

var router = express.Router();


router.get('/server2', function(req, res, next){
  next('error 2222');
});

module.exports = router;