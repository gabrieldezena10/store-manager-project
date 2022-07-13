const productsModel = require('../models/productsModel');
const httpStatusCode = require('./httpStatusCode');
const salesModel = require('../models/salesModel');

const checkQuantity = async (orderArr) => {
  const isQuantityNotValidNumber = await orderArr.find((item) => item.quantity <= 0);
  if (isQuantityNotValidNumber) {
    return {
      error: '"quantity" must be greater than or equal to 1',
      code: httpStatusCode.COULD_NOT_PROCESS,
    };
  }
  const isQuantityNotDefined = await orderArr.find((item) => !item.quantity);
  if (isQuantityNotDefined) {
    return {
      error: '"quantity" is required',
      code: httpStatusCode.BAD_REQUEST,
    };
  }
  return false;
};

const checkProductId = async (orderArr) => {
  const isProductIdNotDefined = await orderArr.find((item) => !item.productId);
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

const checkSaleId = async (id) => {
  const isIdValid = await salesModel.getById(id);
  if (!isIdValid || isIdValid.length < 1) {
    return {
      error: 'Sale not found',
      code: httpStatusCode.NOT_FOUND,
    };
  }
};

const checkArray = async (orderArr) => {
  orderArr.forEach(async (e) => {
    if (!e.quantity) {
      return {
        error: '"quantity" is required',
        code: httpStatusCode.BAD_REQUEST,
      };
    }
    if (!e.productId) {
      return {
        error: '"productId" is required',
        code: httpStatusCode.BAD_REQUEST,
      };
    }
  });
};

module.exports = {
  checkQuantity,
  checkProductId,
  checkSaleId,
  checkArray,
};