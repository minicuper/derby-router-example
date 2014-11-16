exports.main = function(req, res, next){
  console.log('in main');
  next();
};

exports.mainPost = function(req, res, next){
  res.json({name: 'mainPost'});
};
