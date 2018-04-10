var 
  //include all
  User = require('../models/user');


module.exports.setupUser =  function(req, res) {

  // create a sample user
  var newUser = new User({ 
    username: 'developer', 
    password: 'password',
    admin: true 
  });

  // save the sample user
  newUser.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true, message: 'User saved.' });
  });
};

module.exports.authenticateUser =  function(req, res, next) {
  if(req.user)
    next();
  else
    res.status(401).json({message: 'Unauthorized user.', success: false})
};