const salesModel = require('../models/salesModel');
const { checkQuantity, checkProductId } = require('../helpers/salesValidation');

const getAll = async () => {
  const result = await salesModel.getAll();
  return result;
};

const getById = async (id) => {
  const result = await salesModel.getById(id);
  return result;
};

const create = async (orderArr) => {
  const verifyQuantity = await checkQuantity(orderArr);
  if (verifyQuantity) {
    return {
      error: verifyQuantity.error,
      code: verifyQuantity.code,
    };
  }
  const verifyId = await checkProductId(orderArr);
  if (verifyId) {
    return {
      error: verifyId.error,
      code: verifyId.code,
    };
  }
  const result = await salesModel.create(orderArr);
  return result;
};

module.exports = {
  getAll,
  getById,
  create,
};
