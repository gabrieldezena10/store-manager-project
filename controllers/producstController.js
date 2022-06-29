const productsService = require('../services/productsService');

const getAll = async (req, res) => {
  try {
    const data = await productsService.getAll();
    res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await productsService.getById(id);
    if (data.length !== 1) return res.status(404).json({ message: 'Product not found' });
    return res.status(200).json(data[0]);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getAll,
  getById,
};