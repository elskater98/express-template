const express = require('express');
const router = express.Router();
const AuthenticationController = require('../controllers/AuthenticationController');
const {authorize} = require('../utils/token');

router.get('/',AuthenticationController.ValidateUser);
router.get('/profile',authorize, AuthenticationController.getProfile);

module.exports = router;
