"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongodb = require("mongodb");

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  URL,
  DBNAME
} = _config.default;
let db;

const dbConnect = async () => {
  const client = await _mongodb.MongoClient.connect(URL, {
    useUnifiedTopology: true
  });
  db = client.db(DBNAME);
  return db;
};

var _default = dbConnect;
exports.default = _default;