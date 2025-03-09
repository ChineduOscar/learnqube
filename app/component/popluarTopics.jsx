'use client'
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import axiosInstance from '../config';
import { setCourses } from "../store/courseSlice";

const bgColors = [
    "bg-[#FFD700]",
    "bg-[#FF6347]",
    "bg-[#20B2AA]", 
    "bg-[#FF69B4]",
    "bg-[#9370DB]",  
    "bg-[#4682B4]"   
];

const PopularTopics = () => {
    const dispatch = useDispatch();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await axiosInstance.get('/courses');
                if (!response.data) throw new Error('No data received');
                
                dispatch(setCourses(response.data));
                const uniqueCategories = [];
                const categoryIds = new Set();
                
                response.data.forEach(course => {
                    if (course.category && !categoryIds.has(course.category._id)) {
                        categoryIds.add(course.category._id);
                        uniqueCategories.push({
                            id: course.category._id,
                            name: course.category.name,
                            icon: course.category.icon
                        });
                    }
                });
                
                setCategories(uniqueCategories);
            } catch (error) {
                console.error('Error fetching courses:', error);
            } finally {
                setLoading(false);
            }
        };
    
        loadData();
    }, [dispatch]);
    
    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-4 md:mb-6">
                <p className="text-[#481895] text-lg md:text-2xl lg:text-3xl font-semibold">Popular Topics</p>
                <Link href='/categories'>
                    <button className="btn btn-active btn-neutral text-sm md:text-base lg:text-2xl bg-black text-white px-3 py-1 md:px-6 md:py-2 rounded-md">
                        View All
                    </button>
                </Link>
            </div>

            {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-10 mt-6 md:mt-10 lg:mt-20">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div key={index} className="flex items-center gap-2 md:gap-4 p-3 md:p-6 bg-gray-100 shadow-sm rounded-xl border border-gray-200 animate-pulse">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-gray-300 rounded-xl"></div>
                            <div className="h-3 sm:h-4 md:h-5 lg:h-6 bg-gray-200 rounded-md" style={{ width: '60%' }}></div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-10 mt-6 md:mt-10 lg:mt-20">
                    {categories.map((category, index) => (
                        <div 
                            key={category.id} 
                            className="flex items-center gap-2 md:gap-4 p-3 md:p-6 bg-white shadow-md rounded-xl border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-lg"
                        >
                            <div className={`w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 flex items-center justify-center rounded-xl ${bgColors[index % bgColors.length]}`}>
                                <Image 
                                    src={category.icon} 
                                    alt={category.name} 
                                    width={50} 
                                    height={50} 
                                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-8 md:h-8 lg:w-12 lg:h-12"
                                />
                            </div>
                            <p className="text-xs lg:text-base font-semibold text-gray-900">{category.name.split(" ")[0]}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PopularTopics;