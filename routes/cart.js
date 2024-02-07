const { Router } = require('express');
const router = Router();
const { auth } = require('../middleware/auth');
const { cartInsert, fetchCart } = require('../controllers/cart');

router.use(auth)

router.post('/item/:prodId', cartInsert);
router.get('/items', fetchCart);


module.exports = router