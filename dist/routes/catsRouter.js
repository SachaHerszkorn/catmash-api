"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

const routes = (0, _express.Router)();

const initCatsRouter = db => {
  routes.get('/cats', async (req, res) => {
    try {
      const docs = await db.collection('cats').find({}).toArray();
      res.status(200).json(docs);
    } catch (err) {
      res.status(404).json({
        message: err.message
      }); // eslint-disable-next-line no-console

      console.log(err);
    }
  });
  routes.get('/cats/:id', async ({
    params: {
      id
    }
  }, res) => {
    try {
      const docs = await db.collection('cats').findOne({
        _id: id
      });

      if (!docs) {
        throw new Error('Not found');
      }

      res.status(200).json(docs);
    } catch (err) {
      res.status(404).json({
        message: err.message
      }); // eslint-disable-next-line no-console

      console.log(err);
    }
  });
  routes.post('/cats/:id/vote/', async ({
    params: {
      id
    }
  }, res) => {
    try {
      const docs = await db.collection('cats').findOneAndUpdate({
        _id: id
      }, {
        $inc: {
          score: 1
        }
      }, {
        returnOriginal: false
      });
      if (!docs.value) throw new Error('Not found');
      res.status(200).json(docs.value);
    } catch (err) {
      res.status(404).json({
        message: err.message
      }); // eslint-disable-next-line no-console

      console.log(err);
    }
  });
  return routes;
};

var _default = initCatsRouter;
exports.default = _default;