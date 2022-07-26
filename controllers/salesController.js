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
    const salesArr = req.body;
    const data = await salesService.create(salesArr);
    if (data.error) {
      return res.status(data.code).json({ message: data.error });
    }
    return res.status(httpStatusCode.CREATED).json(data);
  } catch (error) {
    console.log(error.message);
  }
};

const exclude = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await salesService.exclude(id);
    if (result.error) {
      return res.status(result.code).json({ message: result.error });
    }
    return res.status(httpStatusCode.NO_CONTENT).json(result);
  } catch (error) {
    console.log(error.message);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const salesArr = req.body;
  try {
  const data = await salesService.update(id, salesArr);
    if (data.error) {
    return res.status(data.code).json({ message: data.error });
    }
  return res.status(httpStatusCode.OK).json(data);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  exclude,
  update,
};
