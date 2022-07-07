const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../helpers/connection');
const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/producstController');
const httpStatusCode = require('../../../helpers/httpStatusCode');

describe('Tests regarding the productsController.test file', () => {
  describe('Tests the function getAll from controller', () => {
    const response = {};
    const request = {};

    before(() => {
      const payloadProducts = [
        {
          "id": 1,
          "name": "Martelo de Thor"
        },
        {
          "id": 2,
          "name": "Traje de encolhimento"
        },
        {
          "id": 3,
          "name": "Escudo do Capitão América"
        }
      ];

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsService, 'getAll').resolves(payloadProducts);
    });
  
    after(() => {
      productsService.getAll.restore();
    });

    it('returns status 200 (ok)', async () => {
      await productsController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });

    describe('Tests the function getById from controller', () => {
        describe('when there IS a product with the ID informed', () => {

        const response = {};
        const request = {};

        const payloadProducts = [
        {
          "id": 1,
          "name": "Martelo de Thor"
        },
        ];
        before(async () => {
        request.params = { id: 1 }
      
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        await sinon.stub(productsService, 'getById').resolves(payloadProducts);
        });

        after(async () => {
        await productsService.getById.restore();
        });

        it('returns status code 200', async () => {
          await productsController.getById(request, response);
          expect(response.status.calledWith(httpStatusCode.OK)).to.be.equal(true);
        });
      });
    });

    describe('Tests the function create in controllers', () => {
        const req = {};
        const res = {};

        before(() => {
        const objCreated = {
          id: 4,
          name: 'Mapa de Hogwarts'
        }
        req.body = { name: 'Mapa de Hogwarts' }
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(productsService, "create").resolves(objCreated);
        });

        after(async () => {
        productsService.create.restore();
        });

        it("returns status code 201", async () => {
          await productsController.create(req, res);

          expect(res.status.calledWith(httpStatusCode.CREATED)).to.be.equal(true);
        });
      });
    
      describe('Tests the function UPDATE in controllers', () => {
        describe('if sucessfull', () => {
          const req = {};
          const res = {};

          before(() => {
            const objCreated = {
              id: 1,
              name: 'Capa de invisibilidade'
            }
            req.params = 1
            req.body = { name: 'Capa de invisibilidade' }
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();

            sinon.stub(productsService, "update").resolves(objCreated);
          });

          after(async () => {
            productsService.update.restore();
          });

          it("returns status code 200", async () => {
            await productsController.update(req, res);
            expect(res.status.calledWith(httpStatusCode.OK)).to.be.equal(true);
          });
        });
        // describe('if finds error', () => {
        //   const req = {};
        //   const res = {};

        //   before(() => {
        //     const objCreated = {
        //       id: 1,
        //       name: 'Capa'
        //     }
        //     req.params = 1
        //     req.body = { name: 'Capa' }
        //     res.status = sinon.stub().returns(res);
        //     res.json = sinon.stub().returns();

        //     sinon.stub(productsService, "update").resolves(objCreated);
        //   });

        //   after(async () => {
        //     productsService.update.restore();
        //   });

        //   it("name does not have minimum length - returns status code 422", async () => {
        //     await productsController.update(req, res);
        //     expect(res.status.calledWith(httpStatusCode.COULD_NOT_PROCESS)).to.be.equal(true);
        //   });
        // })
      });
  
      describe('Tests the function EXCLUDE in controllers', () => {
        const req = {};
        const res = {};

        before(() => {

          req.params = 1
          res.status = sinon.stub().returns(res);
          res.send = sinon.stub().returns();

          sinon.stub(productsService, "exclude").resolves({
            id: 1,
          });
        });

        after(async () => {
          productsService.exclude.restore();
        });

          it("Returns the status code 204", async () => {
            await productsController.exclude(req, res);

            expect(res.status.calledWith(httpStatusCode.NO_CONTENT)).to.be.equal(true);
          });

      });
});
