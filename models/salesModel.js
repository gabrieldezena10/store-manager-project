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
  const query = `SELECT S.date, SL.product_id AS productId, SL.quantity
  FROM StoreManager.sales AS S
  INNER JOIN StoreManager.sales_products AS SL
  ON S.id = SL.sale_id
  WHERE S.id = ?
  ORDER BY S.id, SL.product_id;`;
  const [rows] = await connection.execute(query, [id]);
  return rows;
};

const addSalesID = async () => {
  const query = 'INSERT INTO StoreManager.sales (date) VALUES (NOW())';
  const [row] = await connection.execute(query);
  return row.insertId;
};

const create = async (salesArr) => {
  const saleId = await addSalesID();
  const query = `INSERT INTO 
  StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)`;
  
  await salesArr.map(async ({ productId, quantity }) => {
    const [result] = await connection.execute(query, [saleId, productId, quantity]);
    return result;
  });

  return {
    id: saleId,
    itemsSold: salesArr,
  };
};

const exclude = async (id) => {
  const query = 'DELETE FROM StoreManager.sales WHERE id = ?';
  const [data] = await connection.execute(query, [id]);

  return data;
};

module.exports = {
  getAll,
  getById,
  create,
  exclude,
};
