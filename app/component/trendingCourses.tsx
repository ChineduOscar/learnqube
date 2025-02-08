import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import photographyThumbnail from '../assets/photographyThumbnail.jpg';
import designThumbnail from '../assets/designThumbnail.jpg';
import websiteThumbnail from '../assets/websiteThumbnail.jpg';

const courses = [
    {
        id: 1,
        title: "React Crash Course",
        category: "Website Development",
        author: "Chinedu Oscar",
        thumbnail: websiteThumbnail
    },
    {
        id: 2,
        title: "Mastering UI/UX Design",
        category: "Design",
        author: "Chinedu Oscar",
        thumbnail: designThumbnail
    },
    {
        id: 3,
        title: "Mastering Portrait Photography",
        category: "Photography",
        author: "Chinedu Oscar",
        thumbnail: photographyThumbnail
    },
];

const TrendingCourses = () => {
  return (
    <div className="mt-20">
        <div className="flex items-center justify-between">
            <p className="text-[#481895] text-[22px] md:text-3xl font-semibold">Trending courses</p>
            <Link href='/courses'>
                <button className="btn btn-active btn-neutral md:text-2xl bg-black text-white px-6 py-2 rounded-md">
                    View All
                </button>
            </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12 md:mt-20">
            {courses.map((course) => (
                <div key={course.id} className="bg-white shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105">
                    <Image 
                        src={course.thumbnail} 
                        alt={course.title} 
                        className="w-full h-48 object-cover"
                    />
                    <div className="p-5">
                        <p className="text-sm font-medium text-white bg-[#545454] rounded-lg w-fit p-1">{course.category}</p>
                        <h3 className="text-lg font-semibold text-gray-900 mt-2">{course.title}</h3>
                        <p className="text-sm text-[#545454] mt-1">By {course.author}</p>
                        
                        <button className="btn btn-active btn-neutral mt-4 w-full bg-[#481895] text-white py-2 rounded-md text-sm font-medium">
                            Enroll Course
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default TrendingCourses;
