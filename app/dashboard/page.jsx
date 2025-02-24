'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Dashboard = () => {
  const router = useRouter();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get("token");

    if (urlToken) {
      document.cookie = `token=${urlToken}; path=/; secure; samesite=None;`;

      setTimeout(() => {
        router.replace("/dashboard");
      }, 2000);
    }

    // Read token from cookies
    const storedToken = Cookies.get("token");
    if (storedToken) {
      setToken(storedToken);
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
