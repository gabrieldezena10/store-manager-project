const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../helpers/connection');
const productsService = require('../../../services/productsService');
const productsControllers = require('../../../controllers/producstController');

describe('calling getAll from controller', () => {
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
    await productsControllers.getAll(request, response);
    expect(response.status.calledWith(200)).to.be.equal(true);
  });
});

describe('Calling getById from controller', () => {
  describe('when there IS NOT a movie with the ID informed', () => {

    const response = {};
    const request = {};

    before(() => {
      request.params = { id: 1 }

      const payloadProducts = [];
    
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsService, 'getById').resolves(payloadProducts);
    });

    after(() => {
      productsService.getById.restore();
    });

    it('returns status method 404', async () => {
      await productsControllers.getById(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('returns message "Product not found"', async () => {
      await productsControllers.getById(request, response);
      expect(response.json.calledWith('Product not found')).to.be.equal(true);
    });
  });
});

describe('Calling getById from controller', () => {
  describe('when there IS a movie with the ID informed', () => {

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

    it('returns status method 200', async () => {
      await productsControllers.getById(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('returns json method with an object', async () => {
      await productsControllers.getById(request, response);
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});