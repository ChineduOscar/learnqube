'use client'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Image from 'next/image'
import Link from 'next/link'
import axiosInstance from '../config'
import { setCourses } from "../store/courseSlice";

const bgColors = [
    "bg-[#FFD700]",
    "bg-[#FF6347]",
    "bg-[#20B2AA]", 
    "bg-[#FF69B4]",
    "bg-[#9370DB]",  
    "bg-[#4682B4]"   
]

const PopularTopics = () => {
    const dispatch = useDispatch();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
          try {
            const response = await axiosInstance.get('/courses');
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
        <div className="flex items-center justify-between">
            <p className="text-[#481895] text-[22px] md:text-3xl font-semibold">Popular Topics</p>
            <Link href='/categories'>
                <button className="btn btn-active btn-neutral md:text-2xl bg-black text-white px-6 py-2 rounded-md">
                    View All
                </button>
            </Link>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 mt-10">Loading categories...</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10 mt-12 md:mt-20">
              {categories.map((category, index) => (
                  <div 
                      key={category.id} 
                      className="flex items-center gap-2 md:gap-4 p-4 md:p-6 bg-white shadow-md rounded-xl border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-lg"
                  >
                      <div className={`w-8 md:w-16 h-8 md:h-16 flex items-center justify-center rounded-xl ${bgColors[index % bgColors.length]}`}>
                          <Image 
                              src={category.icon} 
                              alt={category.name} 
                              width={50} 
                              height={50} 
                              className="w-6 md:w-12 h-6 md:h-12"
                          />
                      </div>
                      <p className="text-xs md:text-lg font-semibold text-gray-900">{category.name}</p>
                  </div>
              ))}
          </div>
        )}
    </div>
  )
}

export default PopularTopics