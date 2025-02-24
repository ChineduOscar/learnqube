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
      document.cookie = `token=${urlToken}; path=/; secure; samesite=None;`;
      setToken(urlToken);

      setTimeout(() => {
        // Remove token from the URL (use relative path)
        const params = new URLSearchParams(searchParams);
        params.delete("token");

        router.replace(`/dashboard${params.toString() ? `?${params.toString()}` : ""}`, { scroll: false });
      }, 1000);
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
