"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _catsRouter = _interopRequireDefault(require("./catsRouter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();

const initIndexRouter = () => {
  routes.get('/', (req, res) => {
    res.status(200).json({
      message: 'Hello World!'
    });
  });
  return routes;
};

var _default = {
  initIndexRouter,
  initCatsRouter: _catsRouter.default
};
exports.default = _default;