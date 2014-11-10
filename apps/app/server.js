exports.main = function(req, res, next){
  res.send('<a href="/">Hello</a>');
};

exports.mainPost = function(req, res, next){
  console.log('OK');
  res.json({name: 'mainPost'});
};
