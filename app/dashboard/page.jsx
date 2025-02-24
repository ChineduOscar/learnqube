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

      // Safely remove token from URL
      const params = new URLSearchParams(searchParams);
      params.delete('token');
      const path = `/dashboard`;

      // Use push instead of replace to avoid cross-origin issues
      router.push(path, { scroll: false });
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