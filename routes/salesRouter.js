const express = require('express');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.get('/', salesController.getAll);
router.post('/', salesController.create);
router.get('/:id', salesController.getById);
router.delete('/:id', salesController.exclude);
router.put('/:id', salesController.update);

module.exports = router;
