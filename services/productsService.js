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

const create = async (name) => {
  if (name) {
    const product = await productsModel.create(name);
    return product;
  }
  return [];
};

module.exports = {
  getAll,
  getById,
  create,
};