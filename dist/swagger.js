"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  swagger: '2.0',
  info: {
    title: 'Catmash API',
    description: 'API to vote for the cutest cat',
    version: '1.0.0'
  },
  host: 'api.example.com',
  basePath: '/v1',
  schemes: ['https'],
  paths: {
    '/cats': {
      get: {
        summary: 'Returns a list of cats.',
        produces: ['application/json'],
        responses: {
          200: {
            description: 'OK',
            schema: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  _id: {
                    type: 'string'
                  },
                  url: {
                    type: 'string'
                  },
                  score: {
                    type: 'number'
                  }
                }
              }
            }
          }
        }
      }
    },
    '/cats/:id': {
      get: {
        summary: 'Returns cat by id.',
        produces: ['application/json'],
        responses: {
          200: {
            description: 'OK',
            schema: {
              type: 'object',
              properties: {
                _id: {
                  type: 'string'
                },
                url: {
                  type: 'string'
                },
                score: {
                  type: 'number'
                }
              }
            }
          }
        }
      }
    },
    '/cats/:catId/vote': {
      post: {
        summary: 'Votes for a cat by incrementing his score by 1.',
        produces: ['application/json'],
        parameters: [{
          name: 'catId',
          in: 'path',
          description: 'Id of the cat that needs his score to be updated',
          required: true,
          type: 'string'
        }],
        responses: {
          200: {
            description: 'OK',
            schema: {
              type: 'object',
              properties: {
                _id: {
                  type: 'string'
                },
                url: {
                  type: 'string'
                },
                score: {
                  type: 'number'
                }
              }
            }
          }
        }
      }
    }
  }
};
exports.default = _default;