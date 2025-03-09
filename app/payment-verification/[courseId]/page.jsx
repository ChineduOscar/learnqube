'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '../../config'
import Cookies from 'js-cookie';
import Link from 'next/link';

const PaymentVerification = () => {
  const router = useRouter();
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('Verifying your payment...');

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const reference = urlParams.get('reference');
        
        if (!reference) {
          setStatus('error');
          setMessage('Payment reference not found. Please contact support.');
          return;
        }

        const token = Cookies.get('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const response = await axiosInstance.get(
          `/pay/hook/${reference}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setStatus('success');
          setMessage('Payment successful! You have been enrolled in the course.');
        } else {
          setStatus('error');
          setMessage(response.data.message || 'Payment verification failed.');
        }
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('error');
        setMessage('An error occurred while verifying your payment. Please contact support.');
      }
    };

    verifyPayment();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Payment Verification
          </h2>
        </div>
        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
          {status === 'verifying' && (
            <div className="animate-pulse">
              <div className="flex justify-center">
                <div className="w-12 h-12 border-4 border-[#481895] border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="mt-4 text-lg text-gray-600">{message}</p>
            </div>
          )}

          {status === 'success' && (
            <div>
              <div className="flex justify-center">
                <svg
                  className="w-16 h-16 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <p className="mt-4 text-lg text-gray-600">{message}</p>
              <div className="mt-8 flex justify-center space-x-4">
                <Link href="/dashboard">
                  <div className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#481895] hover:bg-opacity-90">
                    Go to My Dashboard
                  </div>
                </Link>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div>
              <div className="flex justify-center">
                <svg
                  className="w-16 h-16 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </div>
              <p className="mt-4 text-lg text-gray-600">{message}</p>
              <div className="mt-8 flex justify-center">
                <Link href="/courses">
                  <div className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#481895] hover:bg-opacity-90">
                    Return to Courses
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentVerification;