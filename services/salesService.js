const salesModel = require('../models/salesModel');

const getAll = async () => {
  const result = await salesModel.getAll();
  return result;
};

const getById = async (id) => {
  const result = await salesModel.getById(id);
  return result;
};

const create = async (productId, quantity) => {
  const result = await salesModel.create(productId, quantity);
  return result;
};

module.exports = {
  getAll,
  getById,
  create,
};
