const express = require('express');
const router = express.Router();

//Controllers
UserController = require('../controllers/sis_users_controllers/sis_users');
ArduinoController = require('../controllers/arduino_Controller/arduino_controller');


//user routes
router.post('/signup',UserController.create_a_user);
router.post('/login',UserController.login_a_user);
router.get('/users',UserController.get_all_users);


//arduino routes
router.get('/arduino/on',ArduinoController.turn_on_arduino);
router.get('/arduino/off',ArduinoController.turn_off_arduino);


module.exports = router;
