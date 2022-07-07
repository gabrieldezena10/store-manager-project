const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../helpers/connection');
const productsModel = require('../../../models/productsModel');

describe('Tests regarding the productsModel.test file', () => {
  describe('Checks if all the products are obtained', () => {
    before(async () => {
      const payloadProducts = [
        [
          { "id": 1, "name": "Martelo de Thor" },
          { "id": 2,"name": "Traje de encolhimento" },
          { "id": 3,"name": "Escudo do Capitão América" }
        ]
      ];
      await sinon.stub(connection, 'execute').resolves(payloadProducts);
    });
    after(async () => {
      await connection.execute.restore();
    });

    it('returns an array', async () => {
      const response = await productsModel.getAll();
      expect(response).to.be.a('array');
    });
  });
  
  describe('Checks the getById function returning only one product by its ID', () => {
    before(async () => {
      const execute = [[]];
      await sinon.stub(connection, 'execute').resolves(execute);
    });
    
    after(async () => {
      await connection.execute.restore();
    });

    describe('when there IS a product with the ID informed', () => {
      before(() => {
        sinon.stub(productsModel, 'getById').resolves(
          [{
            "id": 2, "name": "Traje de encolhimento"
          }]
        );
      });
    
      after(() => {
        productsModel.getById.restore();
      });

      it('returns an object', async () => {
        const response = await productsModel.getById(2);
        expect(response).to.be.an('array');
      });
      it('returns not empty', async () => {
        const response = await productsModel.getById(2);
        expect(response).not.to.be.empty;
      });
    });
  });

  describe('Checks the create function to insert a new product', () => {
    before(async () => {
      const execute = [{ insertId: 4 }]

      await sinon.stub(connection, 'execute').resolves(execute);
    });
    
    after(async () => {
      await connection.execute.restore();
    });

    describe('when is sucessfully inserted', () => {
      it('returns an object', async () => {
        const response = await productsModel.create('random product A');
        expect(response).to.be.a('object');
      });

      it('the object has theproperty "id"', async () => {
        const response = await productsModel.create('random product A');
        expect(response).to.have.property('id');
      });
    });
  });

  describe('Checks the update function', () => {
    before(async () => {
      const payloadProducts = [
        [{ "id": 1, "name": "Martelo de Thor" }]
      ];
      await sinon.stub(connection, 'execute').resolves(payloadProducts);
    });
    
    after(async () => {
      await connection.execute.restore();
    });

    describe('when is sucessfully updated', () => {
      it('returns a new object', async () => {
        const id = 1;
        const name = 'Martelo da Jane';
        mock = { id, name }
        const response = await productsModel.update(id, name);
        expect(response).to.deep.equal(mock);
      });
    });
  })

  // describe('Checks the exclude function', () => {
  //   before(async () => {
  //     const payloadProducts = [
  //         { "id": 1, "name": "Martelo de Thor" },
  //     ];
  //     await sinon.stub(connection, 'execute').resolves(payloadProducts);
  //   });
    
  //   after(async () => {
  //     await connection.execute.restore();
  //   });

  //   describe('when is sucessfully excluded', () => {
  //     it('returns nothing', async () => {
  //       const id = 1;
  //       const response = await productsModel.exclude(id);
  //       expect(response).to.not.exist;
  //     });
  //   });
  // })
})

