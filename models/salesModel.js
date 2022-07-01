const connection = require('../helpers/connection');

const serialize = (salesData) => ({
  saleId: salesData.id,
  date: salesData.date,
  productId: salesData.product_id,
  quantity: salesData.quantity,
});

const getAll = async () => {
  const query = `SELECT S.id, S.date, SL.product_id, SL.quantity
  FROM StoreManager.sales AS S
  INNER JOIN StoreManager.sales_products AS SL
  ON S.id = SL.sale_id
  ORDER BY S.id, SL.product_id;`;

  const [rows] = await connection.execute(query);
  return rows.map(serialize);
};

const getById = async (id) => {
  const query = `SELECT S.date, SL.product_id, SL.quantity
  FROM StoreManager.sales AS S
  INNER JOIN StoreManager.sales_products AS SL
  ON S.id = SL.sale_id
  WHERE S.id = ?
  ORDER BY S.id, SL.product_id;`;
  const [rows] = await connection.execute(query, [id]);
  return rows.map(({ date, product_id: productId, quantity }) => ({
    date,
    productId,
    quantity,
  }));
};

const addToSalesTable = async () => {
  const query = 'INSERT INTO StoreManager (date) VALUES (NOW())';
  const [row] = await connection.execute(query);
  return row.insertId;
};

const create = async (productId, quantity) => {
  // const query = 'INSERT INTO StoreManager.sales_products (product_id, quantity) VALUES (?, ?, ?)';
  const id = await addToSalesTable();
  // const [row] = await connection.execute(query, [id, productId, quantity]);

  const result = {
    id,
    itemsSold: [
      productId,
      quantity,
    ],
 
  };
 
  return result;
};

module.exports = {
  getAll,
  getById,
  create,
};
