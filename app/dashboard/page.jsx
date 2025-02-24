'use client'
import { useEffect, useState } from "react";
import axiosInstance from '../config';
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axiosInstance.get("/auth/get-token", {
          withCredentials: true,
        });

        if (response.data.token) {
          setToken(response.data.token);
          console.log("Token retrieved:", response.data.token);
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Error fetching token:", error);
        router.push("/login");
      }
    };

    fetchToken();
  }, []);

  return <div>Welcome to the Dashboard! Token: {token}</div>;
};

export default Dashboard;
