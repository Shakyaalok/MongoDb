const { Router } = require('express');
const router = Router();
const { auth } = require('../middleware/auth')
const { addProduct, getoneProduct, getallProducts, removeOne, updtOne } = require('../controllers/products')


router.use(auth)
router.post('/add-product', addProduct);
router.get('/product/:prodId', getoneProduct);
router.get('/products/all', getallProducts);
router.delete('/delete/:deleteId', removeOne)
router.put('/update/:prodId', updtOne);

// in routing such type of error can also suppose we defined two routes like
// '/product'  and both of them are of get or may be post but both are same type of https
// '/:id'
// then we are search for /product then /:id may triggered so defined the route like that
// '/product/:id'
// '/products/all'




module.exports = router;