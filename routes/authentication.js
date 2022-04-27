var express = require('express');
var router = express.Router();

var authController = require('../controllers/authController');

router.post('/login', authController.loginPost);

router.post('/register', authController.registerPost);


module.exports = router;