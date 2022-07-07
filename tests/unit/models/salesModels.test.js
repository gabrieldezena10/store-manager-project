const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../helpers/connection');
const salesModel = require('../../../models/salesModel');

describe('Tests regarding the salesModel.test file', () => {
  describe('Checks if all the sales are obtained', () => {
    before(async () => {
      const payloadProducts = [
        [
          {
            "saleId": 1,
            "date": "2022-07-06T21:58:59.000Z",
            "productId": 2,
            "quantity": 10
          },
          {
            "saleId": 2,
            "date": "2022-07-06T21:58:59.000Z",
            "productId": 3,
            "quantity": 15
          }
        ]
      ];
      await sinon.stub(connection, 'execute').resolves(payloadProducts);
    });
    
    after(async () => {
      await connection.execute.restore();
    });

    it('returns an array', async () => {
      const response = await salesModel.getAll();
      expect(response).to.be.a('array');
    });
  });
  
  describe('Gets only one product in the database by its ID', () => {

    before(async () => {
      const execute = [[]];
      await sinon.stub(connection, 'execute').resolves(execute);
    });
    
    after(async () => {
      await connection.execute.restore();
    });

    describe('when there IS a product with the ID informed', () => {
      before(() => {
      sinon.stub(salesModel, 'getById')
        .resolves(
          [{
            "date": "2022-07-06T21:58:59.000Z",
            "productId": 2,
            "quantity": 10
          }]
        );
      });

      after(() => {
      salesModel.getById.restore();
      });
      
      it('returns an array', async () => {
        const response = await salesModel.getById(1);
        expect(response).to.be.an('array');
      });
      it('returns not empty', async () => {
        const response = await salesModel.getById(1);
        expect(response).not.to.be.empty;
      });
      it('returns with the properties: "date", "productId" and "quantity"', async () => {
        const [response] = await salesModel.getById(1);
        expect(response).to.include.all.keys('date', 'productId', 'quantity');
      });
    });
  });

  describe('Checks the create function to insert a new sale', () => {
    const payloadProducts = [
          {
            "productId": 1,
            "quantity":1
          },
          {
            "productId": 2,
            "quantity":5
          }
      ];
    before(async () => {
      const execute = [{ insertId: 1 }];
      await sinon.stub(connection, 'execute').resolves(execute);
    });
    
    after(async () => {
      await connection.execute.restore();
    });

    describe('when is sucessfully inserted', () => {
      it('returns an object', async () => {
        const response = await salesModel.create(payloadProducts);
        expect(response).to.be.a('object');
      });

      it('the object has the property "id"', async () => {
        const response = await salesModel.create(payloadProducts);
        expect(response).to.have.property('id');
      });
    });
  });

})