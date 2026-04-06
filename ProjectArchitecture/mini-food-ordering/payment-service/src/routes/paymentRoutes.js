const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/payments', paymentController.processPayment);
router.get('/payments', paymentController.getPayments);
router.get('/notifications', paymentController.getNotifications);

module.exports = router;
