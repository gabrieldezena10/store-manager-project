const express = require('express');
const productsController = require('../controllers/producstController');
const isValidName = require('../middlewares/productValidation');

const router = express.Router();

router.get('/', productsController.getAll);

router.post('/', isValidName, productsController.create);

router.get('/:id', productsController.getById);

router.put('/:id', productsController.update);

module.exports = router;
