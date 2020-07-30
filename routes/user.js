const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const {authorize} = require('../utils/token');

router.get('/', authorize, UserController.getUsers);
router.get('/:id', authorize, UserController.getUser);
/*router.post('/:id', authorize, UserController.getUser);
router.patch('/:id', authorize, UserController.getUser);
router.delete('/:id', authorize, UserController.getUser);*/

module.exports = router;
