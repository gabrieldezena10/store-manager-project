const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../helpers/connection');
const salesController = require('../../../controllers/salesController');
const salesService = require('../../../services/salesService');
const httpStatusCode = require('../../../helpers/httpStatusCode');

describe('Tests regarding the salesController.test file', () => {
  describe('Tests the function getAll from controller', () => {
    const response = {};
    const request = {};

    before(() => {
      const payloadProducts = [
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
      ];

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesService, 'getAll').resolves(payloadProducts);
    });
  
    after(() => {
      salesService.getAll.restore();
    });

    it('returns status 200 (ok)', async () => {
      await salesController.getAll(request, response);
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
        await sinon.stub(salesService, 'getById').resolves(payloadProducts);
        });

        after(async () => {
        await salesService.getById.restore();
        });

        it('returns status code 200', async () => {
          await salesController.getById(request, response);
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

        sinon.stub(salesService, "create").resolves(objCreated);
        });

        after(async () => {
        salesService.create.restore();
        });

        it("returns status code 201", async () => {
          await salesController.create(req, res);

          expect(res.status.calledWith(httpStatusCode.CREATED)).to.be.equal(true);
        });
      });

   
  
  
});
  

 



 

//   describe('Checks the exclude function', () => {
//     describe('checks the id validation', () => {
//       before(async () => {
//         const execute = [[]];
//         await sinon.stub(connection, 'execute').resolves(execute);
//       });
//       after(async () => { await connection.execute.restore() });

//       describe('and id is not valid', async () => {
//         it('returns code 404', async () => {
//           const id = 1;
//           const response = await salesService.exclude(id);
//           const { code } = response;
//           expect(code).to.be.equal(httpStatusCode.NOT_FOUND);
//         })
//       });

//       describe('id is valid', async () => {
//         before(() => {
//           sinon.stub(salesModel, 'getById').resolves(
//             { "id": 1, "name": "Capa de invisibilidade" });
//         });
//         after(() => {
//           salesModel.getById.restore();
//         });

//         it('returns the id of the exluded object', async () => {
//           const response = await salesService.getById(1);
//           const { id } = response;
//           const result = await salesService.exclude(id);
//           expect(result).to.have.property('id');
//         })
//       });

//     });

//   });