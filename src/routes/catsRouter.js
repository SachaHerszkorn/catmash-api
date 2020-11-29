import { Router } from 'express';

const routes = Router();

const initCatsRouter = (db) => {
  routes.get('/cats', async (req, res) => {
    try {
      const docs = await db.collection('cats').find({}).sort({ score: -1 }).toArray();
      res.status(200).json(docs);
    } catch (err) {
      res.status(404).json({ message: err.message });
      // eslint-disable-next-line no-console
      console.log(err);
    }
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
      // eslint-disable-next-line no-console
      console.log(err);
    }
  });

  routes.get('/mash', async (req, res) => {
    try {
      let size = 2;
      const hasMultipleSample = Math.floor(Math.random() * 10);
      if (hasMultipleSample === 0) size += Math.floor(Math.random() * 2);
      const docs = await db
        .collection('cats')
        .aggregate([{ $sample: { size } }])
        .toArray();
      if (!docs) {
        throw new Error('Not found');
      }
      res.status(200).json(docs);
    } catch (err) {
      res.status(404).json({ message: err.message });
      // eslint-disable-next-line no-console
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
      // eslint-disable-next-line no-console
      console.log(err);
    }
  });

  return routes;
};

export default initCatsRouter;
