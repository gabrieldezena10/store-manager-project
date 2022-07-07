const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../helpers/connection');
const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');
const httpStatusCode = require('../../../helpers/httpStatusCode');

describe('Tests regarding the productsService.test file', () => {
  describe('checks if all the products are obtained', () => {
    before(async () => {
      const payloadProducts = [
        { "id": 1, "name": "Martelo de Thor" },
        { "id": 2, "name": "Traje de encolhimento" },
        { "id": 3, "name": "Escudo do Capitão América" }
      ];
      await sinon.stub(productsModel, 'getAll').resolves(payloadProducts);
    });
    
    after(async () => {
      await productsModel.getAll.restore();
    });

    it('returns an object', async () => {
      const [response] = await productsService.getAll();
      expect(response).to.be.a('object');
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
      before(async () => {
        const payloadProducts = { "id": 1, "name": "Escudo do Capitão América" };
        await sinon.stub(productsModel, 'getById').resolves(payloadProducts);
      });
      after(async () => {
        await productsModel.getById.restore();
      });

      it('returns an object', async () => {
        const response = await productsService.getById(1);
        expect(response).to.be.a('object');
      });
      it('returns with the properties: "id" and "name"', async () => {
        const response = await productsService.getById(1);
        expect(response).to.include.all.keys('id', 'name');
      });
    });
  });
  
  describe('Checks the create function to insert a new product', () => {
    describe('When the name is not informed', () => {
      it('return an empty array', async () => {
        const response = await productsService.create();
        expect(response).to.be.an('array').that.is.empty;
      })
    });
    describe('When the name informed is valid', () => {
      it('return an object', async () => {
        const response = await productsService.create("Varinha Harry Potter");
        expect(response).to.be.an('object');
      })
    });
  });

  describe('Checks the update function', () => {
    describe('checks if the name is valid', () => {
      it('returns code 400 if name is undefined', async () => {
        const id = 1;
        const name = '';
        const response = await productsService.update(id, name);
        const { code } = response;
        expect(code).to.be.equal(httpStatusCode.BAD_REQUEST);
      });
    });

    describe('checks if the name has a minimun length', () => {
      it('returns code 422 if name does not have minimum length', async () => {
        const id = 1;
        const name = 'Alex';
        const response = await productsService.update(id, name);
        const { code } = response;
        expect(code).to.be.equal(httpStatusCode.COULD_NOT_PROCESS);
      });
    });

    describe('checks the id validation', () => {
      before(async () => {
        const execute = [[]];

        await sinon.stub(connection, 'execute').resolves(execute);
      });
      after(async () => { await connection.execute.restore() });

      describe('and id is not valid', async () => {
        it('returns code 404', async () => {
          const id = '';
          const name = 'Gabriel';
          const response = await productsService.update(id, name);
          const { code } = response;
          expect(code).to.be.equal(httpStatusCode.NOT_FOUND);
        })
      });

      describe('and name and id are validated', async () => {
        before(() => {
          sinon.stub(productsModel, 'getById').resolves(
            { "id": 2, "name": "Traje de encolhimento" });
        });
        after(() => {
          productsModel.getById.restore();
        });

        it('returns an object', async () => {
          const response = await productsService.getById(2);
          const { id } = response;
          const name = 'Gabriel';
          const result = await productsService.update(id, name);
          expect(result).to.be.an('object');
        })
      });
    });
  })

  describe('Checks the exclude function', () => {
    describe('checks the id validation', () => {
      before(async () => {
        const execute = [[]];
        await sinon.stub(connection, 'execute').resolves(execute);
      });
      after(async () => { await connection.execute.restore() });

      describe('and id is not valid', async () => {
        it('returns code 404', async () => {
          const id = 1;
          const response = await productsService.exclude(id);
          const { code } = response;
          expect(code).to.be.equal(httpStatusCode.NOT_FOUND);
        })
      });

      describe('id is valid', async () => {
        before(() => {
          sinon.stub(productsModel, 'getById').resolves(
            { "id": 1, "name": "Capa de invisibilidade" });
        });
        after(() => {
          productsModel.getById.restore();
        });

        it('returns the id of the exluded object', async () => {
          const response = await productsService.getById(1);
          const { id } = response;
          const result = await productsService.exclude(id);
          expect(result).to.have.property('id');
        })
      });

    });

  });
});
