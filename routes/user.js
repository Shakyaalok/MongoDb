const { Router } = require('express');
const router = Router();
const { createUser, login, getallProducts, placedOrder } = require('../controllers/user');
const { auth } = require('../middleware/auth')


router.get('/login', login)
router.post('/singup', createUser);
router.use(auth)
router.get('/all', getallProducts);
router.get('/order', placedOrder);




module.exports = router;