'use client'
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Copy, Check } from "lucide-react";
import Cookies from "js-cookie";

const DashboardComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const urlToken = searchParams.get("token");
    const urlName = searchParams.get("name");
    const urlRole = searchParams.get("role");

    if (urlToken) {
      // Save all user data in cookies
      Cookies.set('token', urlToken, { 
        secure: true, 
        sameSite: 'None',
        path: '/'
      });
      
      if (urlName) {
        Cookies.set('userName', urlName, { 
          secure: true, 
          sameSite: 'None',
          path: '/'
        });
      }
      
      if (urlRole) {
        Cookies.set('userRole', urlRole, { 
          secure: true, 
          sameSite: 'None',
          path: '/'
        });
      }

      // Set states
      setToken(urlToken);
      setUserName(urlName);
      setUserRole(urlRole);

      // Redirect without the query parameters
      window.location.href = `${window.location.origin}/dashboard`;
    } else {
      // Read from cookies if no URL parameters
      const storedToken = Cookies.get("token");
      const storedName = Cookies.get("userName");
      const storedRole = Cookies.get("userRole");

      if (storedToken) {
        setToken(storedToken);
        setUserName(storedName);
        setUserRole(storedRole);
      }
    }
  }, [searchParams, router]);

  const copyToken = async () => {
    try {
      await navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy token:', err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome{userName ? `, ${userName}!` : '!'}</h1>
      {token ? (
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="font-medium">User Details:</p>
            <p>Name: {userName || 'Not available'}</p>
            <p>Role: {userRole || 'Not available'}</p>
          </div>
          
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium">Token:</p>
              <button
                onClick={copyToken}
                className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                {copied ? (
                  <>
                    <Check size={16} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    Copy Token
                  </>
                )}
              </button>
            </div>
            <div className="bg-white p-3 rounded border break-all">
              <code className="text-sm">{token}</code>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DashboardComponent;