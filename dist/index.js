"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _express = _interopRequireDefault(require("express"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _routes = _interopRequireDefault(require("./routes"));

var _config = _interopRequireDefault(require("./config"));

var _swagger = _interopRequireDefault(require("./swagger"));

var _dbConnection = _interopRequireDefault(require("./dbConnection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  PORT
} = _config.default;
const {
  initIndexRouter,
  initCatsRouter
} = _routes.default;
const app = (0, _express.default)();

(async () => {
  const db = await (0, _dbConnection.default)();
  app.use('/', initIndexRouter(db));
  app.use('/', initCatsRouter(db));
})();

app.use('/docs', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(_swagger.default));
app.use(_express.default.json());

if (process.env.NODE_ENV === 'production') {
  const distDir = _path.default.join(__dirname, '/dist/');

  app.use(_express.default.static(distDir));
}

const server = app.listen(PORT, () => {
  console.log(`Running server on ${PORT}`);
});
var _default = server;
exports.default = _default;