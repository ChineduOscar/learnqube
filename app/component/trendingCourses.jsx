'use client'
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Cookies from 'js-cookie';
import getYouTubeThumbnail from '../utils/videoThumnail';
import axios from 'axios';
import axiosInstance from '../config';

const TrendingCourses = () => {
  const router = useRouter();
  const courses = useSelector((state) => state.courses.courses);
  const [processedCourses, setProcessedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCourseId, setLoadingCourseId] = useState(null);
  const [userEnrolledCourses, setUserEnrolledCourses] = useState([]);

  const token = Cookies.get('token');
  const email = Cookies.get('userEmail');

  useEffect(() => {
    const fetchUserCourse = async() => {
      try {
        const response = await axiosInstance.get('/courses/enrolled', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserEnrolledCourses(response?.data?.enrolledCourses || []);
      } catch(error) {
        console.log("Error fetching courses", error);
      }
    }
      
    if (token) fetchUserCourse();
  }, [token]);

  const handlePayment = async (amount, courseId) => {
    try {
      setLoadingCourseId(courseId);
      if (!token) {
        router.push('/login');
        return;
      }
      if (userEnrolledCourses.some(Enrolledcourse => Enrolledcourse?.course?._id === courseId)) {
        router.push('/dashboard');
        return;
      }
      const response = await axiosInstance.post('/pay', {
        amount,
        email,
        courseId,
      });
      console.log("Payment response:", response.data);

      if (response.data.checkoutUrl) {
        window.location.href = response.data.checkoutUrl;
      } else {
        console.log("No checkout URL returned");
      }
    } catch (error) {
      console.log("Payment error:", error.response?.data || error.message);
      alert("Payment initialization failed. Please try again.");
    } finally {
      setLoadingCourseId(null);
    }
  };

  useEffect(() => {
    const processData = () => {
      try {
        if (!courses || courses.length === 0) {
          setLoading(false);
          return;
        }
        const updatedCourses = courses.map(course => ({
          ...course,
          thumbnail: getYouTubeThumbnail(course.videoUrl),
        }));
        setProcessedCourses(updatedCourses);
      } catch (error) {
        console.error('Error processing courses:', error);
      } finally {
        setLoading(false);
      }
    };

    processData();
  }, [courses]);

  return (
    <div className="mt-20">
      <div className="flex items-center justify-between">
        <p className="text-[#481895] text-[22px] md:text-3xl font-semibold">Trending courses</p>
        <Link href="/courses">
          <button className="btn btn-active btn-neutral md:text-2xl bg-black text-white px-6 py-2 rounded-md">
            View All
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12 md:mt-20">
        {loading
          ? // Skeleton loading UI
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-gray-100 shadow-md rounded-xl overflow-hidden animate-pulse border border-gray-200">
                <div className="w-full h-36 sm:h-40 md:h-44 lg:h-48 bg-gray-200"></div>
                <div className="p-3 sm:p-4 md:p-5">
                  <div className="w-16 sm:w-20 md:w-24 h-3 sm:h-4 bg-gray-200 rounded-md"></div>
                  <div className="w-3/4 h-4 sm:h-5 md:h-6 bg-gray-200 rounded-md mt-2"></div>
                  <div className="w-1/2 h-3 sm:h-4 bg-gray-200 rounded-md mt-1"></div>
                  <div className="w-1/4 h-4 sm:h-5 md:h-6 bg-gray-200 rounded-md mt-2"></div>
                  <div className="w-full h-8 sm:h-9 md:h-10 bg-gray-300 rounded-md mt-3 md:mt-4"></div>
                </div>
              </div>
            ))
          : // Render actual courses
            processedCourses.slice(0, 6).map((course) => {
              const isEnrolled = userEnrolledCourses.some(enrolledCourse => 
                enrolledCourse?.course?._id === course._id
              );
              
              return (
                <div key={course._id} className="bg-white shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105">
                  <Image 
                    src={course.thumbnail} 
                    alt={course.title} 
                    width={400} 
                    height={320} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-5">
                    <p className="text-sm font-medium text-white bg-[#545454] rounded-lg w-fit p-1">
                      {course.category.name}
                    </p>
                    <h3 className="text-lg font-semibold text-gray-900 mt-2">{course.title}</h3>
                    <p className="text-sm text-[#545454] mt-1">By {course.tutor}</p>

                    <p className="text-lg font-semibold text-[#481895] mt-2">${course.price}</p>

                    <button
                      className="btn btn-active btn-neutral mt-4 w-full bg-[#481895] text-white py-2 rounded-md text-sm font-medium flex items-center justify-center"
                      onClick={() => handlePayment(course.price, course._id)}
                      disabled={loadingCourseId === course._id}
                    >
                      {loadingCourseId === course._id ? (
                        <span className="animate-spin border-4 border-white border-t-transparent rounded-full w-5 h-5"></span>
                      ) : (
                        isEnrolled ? "Already Enrolled" : "Enroll Course"
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default TrendingCourses;