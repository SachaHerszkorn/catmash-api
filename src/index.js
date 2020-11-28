import path from 'path';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import routes from './routes';
import config from './config';
import swaggerDocument from './swagger';
import dbConnect from './dbConnection';

const { PORT } = config;
const { initIndexRouter, initCatsRouter } = routes;

const app = express();

(async () => {
  const db = await dbConnect();
  app.use('/', initIndexRouter(db));
  app.use('/', initCatsRouter(db));
})();

app.use(cors());
app.options('*', cors());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  const distDir = path.join(__dirname, '/dist/');
  app.use(express.static(distDir));
}

const server = app.listen(PORT, () => {
  console.log(`Running server on ${PORT}`);
});

export default server;
