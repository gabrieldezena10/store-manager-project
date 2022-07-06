const productsModel = require('../models/productsModel');
const httpStatusCode = require('./httpStatusCode');

const checkId = async (id) => {
  const isIdValid = await productsModel.getById(id);
  if (!isIdValid) {
      return {
        error: 'Product not found',
        code: httpStatusCode.NOT_FOUND,
    };
  }
};

const checkName = async (name) => {
  const MIN_LENGTH = 5;

  if (!name) {
      return {
      error: '"name" is required',
      code: httpStatusCode.BAD_REQUEST,
    };
  }
  if (name.length < MIN_LENGTH) {
    return {
      error: '"name" length must be at least 5 characters long',
      code: httpStatusCode.COULD_NOT_PROCESS,
    };
  }
};

module.exports = {
  checkId,
  checkName,
};