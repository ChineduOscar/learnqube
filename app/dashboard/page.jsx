'use client'
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

const Dashboard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const urlToken = searchParams.get("token");

    if (urlToken) {
      // Save token in cookies
      Cookies.set('token', urlToken, { 
        secure: true, 
        sameSite: 'None',
        path: '/'
      });
      setToken(urlToken);

      // Instead of manipulating history directly, use window.location
      // This avoids cross-origin issues
      window.location.href = `${window.location.origin}/dashboard`;
    } else {
      // Read token from cookies
      const storedToken = Cookies.get("token");
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, [searchParams, router]);

  return (
    <div>
      <h1>Welcome!</h1>
      {token ? <p>Your token is: {token}</p> : <p>Loading...</p>}
    </div>
  );
};

export default Dashboard;