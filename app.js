const express = require('express');
const productsRouter = require('./routes/productsRouter');
const salesRouter = require('./routes/salesRouter');

const app = express();

app.use(express.json());

app.use('/products', productsRouter);
app.use('/sales', salesRouter);

app.get('/', (_request, response) => {
  response.send();
});

module.exports = app;