"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchVisitorData = exports.fetchIPAddress = void 0;
var _axios = _interopRequireDefault(require("axios"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const API_URL = 'http://localhost:4000';
const fetchVisitorData = (visitorId, ip) => {
  return _axios.default.post("".concat(API_URL, "/"), {
    visitor_id: visitorId,
    ip: ip
  });
};
exports.fetchVisitorData = fetchVisitorData;
const fetchIPAddress = () => {
  return _axios.default.get('https://geolocation-db.com/json/');
};
exports.fetchIPAddress = fetchIPAddress;