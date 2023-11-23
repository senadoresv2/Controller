"use strict";

var _react = _interopRequireDefault(require("react"));
var _client = _interopRequireDefault(require("react-dom/client"));
require("./index.css");
var _Access = _interopRequireDefault(require("./Access"));
var _fingerprintjsProReact = require("@fingerprintjs/fingerprintjs-pro-react");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const root = _client.default.createRoot(document.getElementById('root'));
root.render( /*#__PURE__*/_react.default.createElement(_react.default.StrictMode, null, /*#__PURE__*/_react.default.createElement(_fingerprintjsProReact.FpjsProvider, {
  loadOptions: {
    apiKey: 'S6c80fC8NoRThVBKG6Sf'
  }
}, /*#__PURE__*/_react.default.createElement(_Access.default, null))));