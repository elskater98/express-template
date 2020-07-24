const express = require('express');
const router = express.Router();
const AuthenticationController = require('../controllers/AuthenticationController');

router.get('/',AuthenticationController.ValidateUser);

module.exports = router;
