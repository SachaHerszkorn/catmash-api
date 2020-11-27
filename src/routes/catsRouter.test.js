import request from 'supertest';
import { MongoClient } from 'mongodb';

import config from '../config';

import app from '../index';

const { DBNAME, URL } = config;

describe('Cats router testing', () => {
  let db;
  let mongoClient;
  beforeAll(async () => {
    mongoClient = await MongoClient.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await mongoClient.db(DBNAME);
    await db.collection('cats').insertOne({
      _id: 'test',
      url: 'http://24.media.tumblr.com/tumblr_m82woaL5AD1rro1o5o1_1280.jpg',
      score: 0,
    });
  });

  afterAll(async (done) => {
    await db.collection('cats').deleteMany({});
    await mongoClient.close();
    app.close(done);
  });

  afterEach(() => app.close());

  it('should be able to get the list of cats', async () => {
    const response = await request(app).get('/cats');

    expect(response.status).toBe(200);
  });

  it('should be able to get a cat by id', async () => {
    const response = await request(app).get('/cats/test');

    expect(response.status).toBe(200);
  });

  it('should be respond 404 when wrong cat id was provided', async () => {
    const response = await request(app).get('/cats/ebkk');

    expect(response.status).toBe(404);
  });

  it('should be able to vote for a cat by id', async () => {
    const response = await request(app).post('/cats/test/vote');

    expect(response.body.score).toBe(1);
    expect(response.status).toBe(200);
  });

  it('should be respond 404 when wrong cat id was provided', async () => {
    const response = await request(app).get('/cats/ebkk/vote');

    expect(response.status).toBe(404);
  });
});
