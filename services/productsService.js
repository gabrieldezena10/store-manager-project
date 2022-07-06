const productsModel = require('../models/productsModel');
const { checkId, checkName } = require('../helpers/productValidation');

const getAll = async () => {
  const result = await productsModel.getAll();
  return result;
};

const getById = async (id) => {
  const result = await productsModel.getById(id);
  return result;
};

const create = async (name) => {
  if (name) {
    const product = await productsModel.create(name);
    return product;
  }
  return [];
};

const update = async (id, name) => {
  const isNameValid = await checkName(name);
  if (isNameValid) {
    return {
      error: isNameValid.error,
      code: isNameValid.code,
    };
  }
  const idDoNotExists = await checkId(id);
  if (idDoNotExists) {
    return {
        error: idDoNotExists.error,
        code: idDoNotExists.code,
    };
  }
  await productsModel.update(id, name);
  return { id, name };
};

const exclude = async (id) => {
  const idDoNotExists = await checkId(id);
  if (idDoNotExists) {
    return {
      error: idDoNotExists.error,
      code: idDoNotExists.code,
    };
  }
  await productsModel.exclude(id);
  return { id };
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};