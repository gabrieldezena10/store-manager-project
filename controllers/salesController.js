const salesService = require('../services/salesService');
const httpStatusCode = require('../helpers/httpStatusCode');

const getAll = async (req, res) => {
  try {
    const data = await salesService.getAll();
    return res.status(httpStatusCode.OK).json(data);
  } catch (error) {
    console.log(error.message);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await salesService.getById(id);
    if (!data || data.length < 1) {
    return res.status(httpStatusCode.NOT_FOUND).json({ message: 'Sale not found' });
  }
    return res.status(httpStatusCode.OK).json(data);
  } catch (error) {
    console.log(error.message);
  }
};

const create = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const data = await salesService.create(productId, quantity);
    return res.status(httpStatusCode.CREATED).json(data);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getAll,
  getById,
  create,
};
