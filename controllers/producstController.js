const productsService = require('../services/productsService');
const httpStatusCodes = require('../helpers/httpStatusCode');

const getAll = async (req, res) => {
  try {
    const data = await productsService.getAll();
    res.status(httpStatusCodes.OK).json(data);
  } catch (error) {
    console.log(error.message);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await productsService.getById(id);
    if (data.length !== 1) {
      return res.status(httpStatusCodes.NOT_FOUND).json({ message: 'Product not found' });
    }
    return res.status(httpStatusCodes.OK).json(data[0]);
  } catch (error) {
    console.log(error.message);
  }
};

const create = async (req, res) => {
  try {
    const { name } = req.body;
    const data = await productsService.create(name);
    return res.status(httpStatusCodes.CREATED).json(data);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getAll,
  getById,
  create,
};