const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../helpers/connection');
const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');
const httpStatusCode = require('../../../helpers/httpStatusCode');

describe('Tests regarding the salesService.test file', () => {
  describe('tests if all the products are obtained', () => {
    before(async () => {
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
      await sinon.stub(salesModel, 'getAll').resolves(payloadProducts);
    });
    
    after(async () => {
      await salesModel.getAll.restore();
    });

    it('returns an object', async () => {
      const [response] = await salesService.getAll();
      expect(response).to.be.a('object');
    });
  });

  describe('tests the getById function returning only one product by its ID', () => {
    before(async () => {
      const execute = [[]];
      await sinon.stub(connection, 'execute').resolves(execute);
    });
    after(async () => {
      await connection.execute.restore();
    });

    describe('when there IS a sale with the ID informed', () => {
      before(async () => {
        const payloadProducts = 	{
          "date": "2022-07-07T03:05:55.000Z",
          "productId": 3,
          "quantity": 15
        };
        await sinon.stub(salesModel, 'getById').resolves(payloadProducts);
      });
      after(async () => {
        await salesModel.getById.restore();
      });

      it('returns an object', async () => {
        const response = await salesService.getById(1);
        expect(response).to.be.a('object');
      });
      it('returns with the properties: "date", "productId" and "quantity"', async () => {
        const response = await salesService.getById(1);
        expect(response).to.include.all.keys('date', 'productId', 'quantity');
      });
    });
  });
  
  describe('Checks the create function to insert a new product', () => {
    describe('checks if the quantity is valid', () => {
      it('returns code 422 if quantity is not a valid number', async () => {
        const orderArr = [
        {
          "productId": 1,
          "quantity":-1
        },
        {
          "productId": 2,
          "quantity":5
        }
      ];
        const response = await salesService.create(orderArr);
        const { code } = response;
        expect(code).to.be.equal(httpStatusCode.COULD_NOT_PROCESS);
      });
    });

    describe('checks if the quantity is valid', () => {
      it('returns code 400 if quantity is not defined', async () => {
        const orderArr = [
        {
          "productId": 1,
        },
        {
          "productId": 2,
          "quantity":5
        }
      ];
        const response = await salesService.create(orderArr);
        const { code } = response;
        expect(code).to.be.equal(httpStatusCode.BAD_REQUEST);
      });
    });

    describe('checks the id validation', () => {
      before(async () => {
        const execute = [[]];

        await sinon.stub(connection, 'execute').resolves(execute);
      });
      after(async () => { await connection.execute.restore() });
        
      describe('and id is not defined', async () => {
        it('returns code 400', async () => {
          const orderArr = [
            {
              "quantity": 10
            },
            {
              "productId": 2,
              "quantity": 5
            }
          ];
          const response = await salesService.create(orderArr);
          const { code } = response;
          expect(code).to.be.equal(httpStatusCode.BAD_REQUEST);
        })
      });
    });
    describe('when productId and quantity are validated', async () => {
      before(async () => {
        const execute = [[]];

        await sinon.stub(connection, 'execute').resolves(execute);
      });
      after(async () => { await connection.execute.restore() });
        describe('should create', () => {
          const orderArr = [
          { "productId": 1,
            "quantity": 10
          },
          { "productId": 2,
            "quantity":5
            }];
          before(() => {
          const ID_EXAMPLE = 5;

            sinon.stub(salesModel, 'create').resolves({ id: ID_EXAMPLE });
          });
          after(() => {
            salesModel.create.restore();
          });

        it('an object', async () => {
          const result = await salesService.create(orderArr);
          expect(result).to.be.a('object');
        })
      })
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