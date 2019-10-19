const express = require('express');
const router = express.Router();

//Controllers
UserController = require('../controllers/sis_users_controllers/sis_users');


//user routes
router.post('/signup',UserController.create_a_user);
router.post('/login',UserController.login_a_user);


module.exports = router;