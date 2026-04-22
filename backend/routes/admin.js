const express = require('express');
const router = express.Router();
const { getUsers, getAllProducts, getAllOrders, updateOrderStatus } = require('../controllers/adminController');
const auth = require('../middleware/auth');

router.get('/users', auth, (req, res, next) => { if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' }); next(); }, getUsers);
router.get('/products', auth, (req, res, next) => { if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' }); next(); }, getAllProducts);
router.get('/orders', auth, (req, res, next) => { if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' }); next(); }, getAllOrders);
router.put('/orders/:id', auth, (req, res, next) => { if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' }); next(); }, updateOrderStatus);

module.exports = router;