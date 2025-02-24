'use client'
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

const Dashboard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState(null);
  const [name, setName] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const urlToken = searchParams.get("token");
    const urlName = searchParams.get("name");
    const urlRole = searchParams.get("role");

    if (urlToken) {
      // Save values in cookies
      Cookies.set("token", urlToken, { secure: true, sameSite: "None", path: "/" });
      Cookies.set("name", urlName, { secure: true, sameSite: "None", path: "/" });
      Cookies.set("role", urlRole, { secure: true, sameSite: "None", path: "/" });

      // Update state
      setToken(urlToken);
      setName(urlName);
      setRole(urlRole);

      // Redirect without query params
      window.location.href = `${window.location.origin}/dashboard`;
    } else {
      // Read from cookies
      const storedToken = Cookies.get("token");
      const storedName = Cookies.get("name");
      const storedRole = Cookies.get("role");

      if (storedToken) setToken(storedToken);
      if (storedName) setName(storedName);
      if (storedRole) setRole(storedRole);
    }
  }, [searchParams]);

  return (
    <div>
      <h1>Welcome, {name ? name : "Guest"}!</h1>
      <div>lo</div>
      {role && <p>Your role is: {role}</p>}
      {token ? <p>Your token is: {token}</p> : <p>Loading...</p>}
    </div>
  );
};

export default Dashboard;
