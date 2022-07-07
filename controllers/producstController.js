const productsService = require('../services/productsService');
const httpStatusCodes = require('../helpers/httpStatusCode');

const getAll = async (_req, res) => {
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
    if (!data) {
      return res.status(httpStatusCodes.NOT_FOUND).json({ message: 'Product not found' });
    }
    return res.status(httpStatusCodes.OK).json(data);
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

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const data = await productsService.update(id, name);
    if (data.error) {
      return res.status(data.code).json({ message: data.error });
    }
    return res.status(httpStatusCodes.OK).json({ id, name });
  } catch (error) {
    console.log(error.message);
  }
};

const exclude = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await productsService.exclude(id);
    if (result.error) {
      return res.status(result.code).json({ message: result.error });
    }
    return res.status(httpStatusCodes.NO_CONTENT).send();
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};