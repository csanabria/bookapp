var 
    //include all
    express = require('express'),
    router = express.Router(),
    userController = require('../app/controllers/user');

//set up user first.
router.post('/setup', userController.setupUser);

module.exports = router;
