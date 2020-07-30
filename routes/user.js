const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const {authorize} = require('../utils/token');

router.get('/', authorize, UserController.getUsers);
router.post('/', authorize, UserController.createUser);
router.get('/:id', authorize, UserController.getUser);
router.patch('/:id', authorize, UserController.editUser);
router.delete('/:id', authorize, UserController.deleteUser);
router.post('/reset/password', authorize, UserController.resetPassword);

module.exports = router;
