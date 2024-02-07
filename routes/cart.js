const { Router } = require('express');
const router = Router();
const { auth } = require('../middleware/auth');
const { cartInsert, fetchCart, deleteItemsInCart } = require('../controllers/cart');

router.use(auth)

router.post('/item/:prodId', cartInsert);
router.get('/items', fetchCart);
router.delete('/removeItems/:prodId', deleteItemsInCart)


module.exports = router