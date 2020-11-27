import { Router } from 'express';

const routes = Router();

const initCatsRouter = (db) => {
  routes.get('/cats', (req, res) => {
    db.collection('cats')
      .find({})
      .toArray((err, docs) => {
        if (err) {
          console.log(err);
          throw err;
        }
        res.status(200).json(docs);
      });
  });

  routes.get('/cats/:id', async ({ params: { id } }, res) => {
    try {
      const docs = await db.collection('cats').findOne({ _id: id });
      if (!docs) {
        throw new Error('Not found');
      }
      res.status(200).json(docs);
    } catch (err) {
      res.status(404).json({ message: err.message });
      console.log(err);
    }
  });

  routes.post('/cats/:id/vote/', async ({ params: { id } }, res) => {
    try {
      const docs = await db
        .collection('cats')
        .findOneAndUpdate({ _id: id }, { $inc: { score: 1 } }, { returnOriginal: false });
      if (!docs.value) throw new Error('Not found');
      res.status(200).json(docs.value);
    } catch (err) {
      res.status(404).json({ message: err.message });
      console.log(err);
    }
  });

  return routes;
};

export default initCatsRouter;
