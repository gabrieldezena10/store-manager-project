const express = require('express');
const productsController = require('../controllers/producstController');
const isValidName = require('../middlewares/productValidation');

const router = express.Router();

router.get('/', productsController.getAll);

router.get('/:id', productsController.getById);

router.post('/', isValidName, productsController.create);

module.exports = router;
