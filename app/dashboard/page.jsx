'use client'
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Dashboard = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get("token");

    if (urlToken) {
      document.cookie = `token=${urlToken}; path=/; secure; samesite=None;`;

      setTimeout(() => {
        window.history.replaceState({}, "", window.location.pathname);
        setToken(urlToken);
      }, 1000);
    } else {
      const storedToken = Cookies.get("token");
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, []);

  return (
    <div>
      <h1>Welcome!</h1>
      {token ? <p>Your token is: {token}</p> : <p>Loading...</p>}
    </div>
  );
};

export default Dashboard;
