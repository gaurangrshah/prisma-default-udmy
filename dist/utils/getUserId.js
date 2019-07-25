'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getUserId = function getUserId(request) {
  var requireAuth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  // requireAuth is defaulted to true, when no value is passed in, which keeps the rest of our code working.

  var header = request.request ? request.request.headers.authorization : request.connection.context.Authorization;
  // adds conditional logic account for not only authorization passed in by queries and mutations, but subscriptions using the connection property off of request. Queries and mutations access the header via http request whereas subscriptions use web sockets to maintain the connection

  if (header) {
    // console.log('header ran') //⚠️

    // only runs if a header is found from the authorization
    var token = header.replace('Bearer ', '');
    // removes the term "Bearer " from the token, NOTE the space after "Bearer "

    var decoded = _jsonwebtoken2.default.verify(token, 'thisisasecret');
    // console.log("decoded", decoded) //⚠️

    return decoded.userid;
  }

  if (requireAuth) {
    throw new Error("Authentication required");
  }

  return null;
  // fixes edge case where if no user is authenticated, then userId gets set to undefined, which triggers a false-positive - return null to ensure that userId gets set to null instead.

};
exports.default = getUserId;