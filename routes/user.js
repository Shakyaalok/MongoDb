const { Router } = require('express');
const router = Router();
const { createUser, login } = require('../controllers/user')


router.get('/login', login)
router.post('/singup', createUser);



module.exports = router;