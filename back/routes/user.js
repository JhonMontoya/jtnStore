const express = require('express');

const router = express.Router();

const { register, login, update, deleteUser } = require('../controllers/user');

router.post('/register', register);
router.post('/login', login);
router.put('/:id', update);
router.delete('/:id', deleteUser);

model.exports = router;