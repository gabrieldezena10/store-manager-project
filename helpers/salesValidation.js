const productsModel = require('../models/productsModel');
const httpStatusCode = require('./httpStatusCode');

const checkQuantity = async (orderArr) => {
  const isQuantityNotValidNumber = orderArr.find((item) => item.quantity <= 0);
  if (isQuantityNotValidNumber) {
    return {
      error: '"quantity" must be greater than or equal to 1',
      code: httpStatusCode.COULD_NOT_PROCESS,
    };
  }
  const isQuantityNotDefined = orderArr.find((item) => !item.quantity);
  if (isQuantityNotDefined) {
    return {
      error: '"quantity" is required',
      code: httpStatusCode.BAD_REQUEST,
    };
  }
  return false;
};

const checkProductId = async (orderArr) => {
  const isProductIdNotDefined = orderArr.find((item) => !item.productId);
  if (isProductIdNotDefined) {
    return { error: '"productId" is required',
      code: httpStatusCode.BAD_REQUEST,
    };
  }
  const allProducts = await productsModel.getAll();  
  const availableProductsIds = allProducts.map((item) => item.id);

  const salesProductsIds = orderArr.map((sale) => sale.productId);
  const isIdValid = salesProductsIds.every((saleId) => availableProductsIds.includes(saleId));
  
  if (isIdValid === false) {
    return {
      error: 'Product not found',
      code: httpStatusCode.NOT_FOUND,
    };
  }
  return false;
};

module.exports = {
  checkQuantity,
  checkProductId,
};