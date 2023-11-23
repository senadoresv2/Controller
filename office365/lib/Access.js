"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _App = _interopRequireDefault(require("./App"));
var _axios = _interopRequireDefault(require("axios"));
var _fingerprintjsProReact = require("@fingerprintjs/fingerprintjs-pro-react");
var _Api = require("./Api");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Access = () => {
  const [status, setStatus] = (0, _react.useState)(null);
  const {
    isLoading,
    error,
    data
  } = (0, _fingerprintjsProReact.useVisitorData)();
  const [exIp, setExIp] = (0, _react.useState)('');
  const [visitorId, setVisitorId] = (0, _react.useState)('');
  function generateRandomString(length) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  (0, _react.useEffect)(() => {
    if (isLoading || error || !data) return;
    const sendVisitorData = async () => {
      try {
        const ipResponse = await (0, _Api.fetchIPAddress)();
        const ipData = await ipResponse.data;
        const ip = ipData.IPv4;
        setExIp(ip);
        setVisitorId(data.visitorId);
        const response = await _axios.default.post(process.env.REACT_APP_API_URL + "visitor", {
          fingerprint: data.visitorId,
          userAgent: navigator.userAgent,
          ip: ip
        });
        if (response.data.status == 403) {
          window.location.href = process.env.REACT_APP_REDIRCT_URL;
          setStatus(403);
        } else {
          setStatus(200);
          const newUrl = new URL(window.location.href);
          newUrl.pathname = process.env.REACT_APP_PATH_NAME;
          newUrl.searchParams.set("client_id", generateRandomString(80));
          newUrl.searchParams.set("nonce", response.data.session);
          window.history.pushState({
            path: newUrl.toString()
          }, "", newUrl.toString());
        }
      } catch (err) {
        console.error("An error occurred:", err);
        setStatus(500);
      }
    };
    sendVisitorData();
  }, [isLoading, error, data]);
  if (status === null) ;
  if (status === 403) ;
  if (status === 500) ;
  return /*#__PURE__*/_react.default.createElement(_App.default, {
    visitor: visitorId,
    ip: exIp
  });
};
var _default = exports.default = Access;