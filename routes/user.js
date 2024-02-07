const { Router } = require('express');
const router = Router();
const { createUser, login, getallProducts } = require('../controllers/user');
const { auth } = require('../middleware/auth')


router.get('/login', login)
router.post('/singup', createUser);
router.use(auth)
router.get('/all', getallProducts)




module.exports = router;