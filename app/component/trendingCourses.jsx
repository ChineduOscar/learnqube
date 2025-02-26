'use client'
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import getYouTubeThumbnail from '../utils/videoThumnail';
  
const TrendingCourses = () => {
  const courses = useSelector((state) => state.courses.courses);
  const [processedCourses, setProcessedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const processData = () => {
      try {
        if (courses && courses.length > 0) {
          const updatedCourses = courses.map(course => ({
            ...course,
            thumbnail: getYouTubeThumbnail(course.videoUrl),
          }));
          
          setProcessedCourses(updatedCourses);
        }
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
  
      {loading ? (
        <p className="text-center text-gray-500 mt-10">Loading courses...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12 md:mt-20">
          {processedCourses.slice(0, 6).map((course) => (
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

                <button className="btn btn-active btn-neutral mt-4 w-full bg-[#481895] text-white py-2 rounded-md text-sm font-medium">
                  Enroll Course
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
  
export default TrendingCourses;