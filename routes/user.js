const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const {authorize} = require('../utils/token');

router.get('/', authorize, UserController.getUser);

module.exports = router;
