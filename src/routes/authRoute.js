const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');
const middlware = require('../middlewares/index');

router.get('/', middlware.verifyJWT, controller.get);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/', controller.del);
router.patch('/', controller.patch);
router.post('/login', controller.login);

module.exports = router;
