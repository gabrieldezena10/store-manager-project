const connection = require('../helpers/connection');

const getAll = async () => {
  const [rows] = await connection.execute('SELECT * FROM StoreManager.products');

  return rows;
};

const getById = async (id) => {
  const [row] = await connection.execute('SELECT * FROM StoreManager.products WHERE id = ?', [id]);
  return row[0];
};

const create = async (name) => {
  const [data] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [name],
  );
  const result = {
    name,
    id: data.insertId,
  };
  return result;
};

const update = async (id, name) => {
  const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?;';
  const [data] = await connection.execute(query, [name, id]);

  return data;
  // Deu problema nos testes
  // return data.affectedRows;
};

const exclude = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?;';
  await connection.execute(query, [id]);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};