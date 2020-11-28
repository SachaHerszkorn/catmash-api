"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _mongodb = require("mongodb");

var _config = _interopRequireDefault(require("../config"));

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  DBNAME,
  URL
} = _config.default;
describe('Cats router testing', () => {
  let db;
  let mongoClient;
  beforeAll(async () => {
    mongoClient = await _mongodb.MongoClient.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    db = await mongoClient.db(DBNAME);
    await db.collection('cats').deleteMany({});
    await db.collection('cats').insertOne({
      _id: 'test',
      url: 'http://24.media.tumblr.com/tumblr_m82woaL5AD1rro1o5o1_1280.jpg',
      score: 0
    });
  });
  afterAll(async done => {
    await db.collection('cats').deleteMany({});
    await mongoClient.close();

    _index.default.close(done);
  });
  afterEach(() => _index.default.close());
  it('should be able to get the list of cats', async () => {
    const response = await (0, _supertest.default)(_index.default).get('/cats');
    expect(response.status).toBe(200);
  });
  it('should be able to get a cat by id', async () => {
    const response = await (0, _supertest.default)(_index.default).get('/cats/test');
    expect(response.status).toBe(200);
  });
  it('should be respond 404 when wrong cat id was provided', async () => {
    const response = await (0, _supertest.default)(_index.default).get('/cats/ebkk');
    expect(response.status).toBe(404);
  });
  it('should be able to vote for a cat by id', async () => {
    const response = await (0, _supertest.default)(_index.default).post('/cats/test/vote');
    expect(response.body.score).toBe(1);
    expect(response.status).toBe(200);
  });
  it('should be respond 404 when wrong cat id was provided', async () => {
    const response = await (0, _supertest.default)(_index.default).get('/cats/ebkk/vote');
    expect(response.status).toBe(404);
  });
});