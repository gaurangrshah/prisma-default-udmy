'use strict';

require('@babel/polyfill');

var _graphqlYoga = require('graphql-yoga');

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

var _index = require('./resolvers/index');

var _prisma = require('./prisma');

var _prisma2 = _interopRequireDefault(_prisma);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pubsub = new _graphqlYoga.PubSub();

var server = new _graphqlYoga.GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: _index.resolvers,
    context: function context(request) {
        return {
            // allows following properties to be access by resolvers from context
            db: _db2.default,
            pubsub: pubsub,
            prisma: _prisma2.default,
            request: request
        };
    },

    fragmentReplacements: _index.fragmentReplacements
});

server.start({ port: process.env.PORT || 4000 }, function () {
    // using the conditional operator to provide a fallback port for local dev.env
    console.log('The server is up!');
});