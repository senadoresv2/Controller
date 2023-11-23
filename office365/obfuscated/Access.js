import React, { useState, useEffect } from "react";
import App from "./App";
import axios from "axios";
import { useVisitorData } from "@fingerprintjs/fingerprintjs-pro-react";
import { fetchIPAddress } from "./Api";

const Access = () => {
  const [status, setStatus] = useState(null);
  const { isLoading, error, data } = useVisitorData();

  const [exIp, setExIp] = useState('');
  const [visitorId, setVisitorId] = useState('')

  function generateRandomString(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  useEffect(() => {
    if (isLoading || error || !data) return;

    const sendVisitorData = async () => {
      try {
        const ipResponse = await fetchIPAddress();
        const ipData = await ipResponse.data;
        const ip = ipData.IPv4;

        setExIp(ip);
        setVisitorId(data.visitorId)

        const response = await axios.post(
          process.env.REACT_APP_API_URL + "visitor",
          {
            fingerprint: data.visitorId,
            userAgent: navigator.userAgent,
            ip: ip,
          }
        );

        if (response.data.status == 403) {
          window.location.href = process.env.REACT_APP_REDIRCT_URL;
          setStatus(403); 
        } else {
          setStatus(200); 
          const newUrl = new URL(window.location.href);
          newUrl.pathname = process.env.REACT_APP_PATH_NAME;
          newUrl.searchParams.set("client_id", generateRandomString(80));
          newUrl.searchParams.set("nonce", response.data.session);

          window.history.pushState(
            { path: newUrl.toString() },
            "",
            newUrl.toString()
          );
        }
      } catch (err) {
        console.error("An error occurred:", err);
        setStatus(500);
      }
    };

    sendVisitorData();
  }, [isLoading, error, data]);

  if (status === null);
  if (status === 403) ;
  if (status === 500) ;
  return <App visitor={visitorId} ip={exIp} />;
};

export default Access;
