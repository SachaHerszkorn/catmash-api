import { Router } from 'express';

import initCatsRouter from './catsRouter';

const routes = Router();

const initIndexRouter = () => {
  routes.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World!' });
  });

  return routes;
};

export default { initIndexRouter, initCatsRouter };
