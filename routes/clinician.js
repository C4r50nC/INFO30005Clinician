var express = require('express');
var router = express.Router();

var clinicianController = require('../controllers/clinicianController');

router.get('/', clinicianController.patientsGet);

module.exports = router;