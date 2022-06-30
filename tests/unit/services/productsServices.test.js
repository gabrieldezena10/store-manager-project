const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../helpers/connection');
const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');

describe('checks if all the products are obtained', () => {
  before(async () => {
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

    await sinon.stub(connection, 'execute').resolves(payloadProducts);
  });
  
  after(async () => {
    await connection.execute.restore();
  });

  it('returns an object', async () => {
    const response = await productsService.getAll();
    expect(response).to.be.a('object');
  });
});

describe('Gets only one product in the database by its ID', () => {
  before(async () => {
    const payloadProducts = [[]];

    await sinon.stub(connection, 'execute').resolves(payloadProducts);
  });
  
  after(async () => {
    await connection.execute.restore();
  });

  describe('when there IS NOT a movie with the ID informed', () => {
    it('returns null', async () => {
      const response = await productsService.getById();
      expect(response).to.be.empty;
    });
  });
});
  
describe('Gets only one product in the database by its ID', () => {
  before(async () => {
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

    await sinon.stub(connection, 'execute').resolves(payloadProducts);
  });
  
  after(async () => {
    await connection.execute.restore();
  });

  describe('when there IS a movie with the ID informed', () => {
    it('returns an object', async () => {
      const response = await productsService.getById(2);
      expect(response).to.be.a('object');
    });
  });
});
    

