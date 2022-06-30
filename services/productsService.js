const productsModel = require('../models/productsModel');

const getAll = async () => {
  const result = await productsModel.getAll();
  return result;
};

const getById = async (id) => {
  const result = await productsModel.getById(id);
  if (result.length < 1) return [];
  return result;
};

module.exports = {
  getAll,
  getById,
};