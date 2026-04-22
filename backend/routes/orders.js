const express = require('express');
const router = express.Router();
const { getOrders, createOrder, updateOrderStatus } = require('../controllers/orderController');
const auth = require('../middleware/auth');

router.get('/', auth, getOrders);
router.post('/', auth, createOrder);
router.put('/:id', auth, updateOrderStatus);

module.exports = router;