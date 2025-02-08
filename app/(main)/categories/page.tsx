'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import business from '../../assets/business.svg';
import design from '../../assets/design.svg';
import animation from '../../assets/animation.svg';
import photography from '../../assets/photography.svg';
import webDesign from '../../assets/webDesign.svg';

const allCategories = [
    {
        id: 1,
        name: "Business",
        icon: business,
        color: "bg-[#FFD700]",
        subCategories: ["Entrepreneurship", "Finance", "Management", "Marketing"],
        courseCount: 325,
        description: "Master business fundamentals and advanced strategies"
    },
    {
        id: 2,
        name: "Design",
        icon: design,
        color: "bg-[#FF6347]",
        subCategories: ["Graphic Design", "UI/UX", "Interior Design", "Fashion Design"],
        courseCount: 248,
        description: "Learn creative design skills and principles"
    },
    {
        id: 3,
        name: "Marketing",
        icon: business,
        color: "bg-[#20B2AA]",
        subCategories: ["Digital Marketing", "Social Media", "Content Marketing", "SEO"],
        courseCount: 186,
        description: "Develop effective marketing strategies"
    },
    {
        id: 4,
        name: "Photography",
        icon: photography,
        color: "bg-[#FF69B4]",
        subCategories: ["Portrait", "Landscape", "Commercial", "Wedding"],
        courseCount: 157,
        description: "Master photography techniques and editing"
    },
    {
        id: 5,
        name: "3D Animation",
        icon: animation,
        color: "bg-[#9370DB]",
        subCategories: ["Character Animation", "Motion Graphics", "Visual Effects", "3D Modeling"],
        courseCount: 142,
        description: "Create stunning 3D animations and effects"
    },
    {
        id: 6,
        name: "Web Development",
        icon: webDesign,
        color: "bg-[#4682B4]",
        subCategories: ["Frontend", "Backend", "Full Stack", "Mobile Development"],
        courseCount: 294,
        description: "Build modern web applications"
    },
    {
        id: 7,
        name: "Data Science",
        icon: business,
        color: "bg-[#98FB98]",
        subCategories: ["Machine Learning", "Data Analysis", "Python", "Statistics"],
        courseCount: 178,
        description: "Analyze data and build ML models"
    },
    {
        id: 8,
        name: "Music",
        icon: design,
        color: "bg-[#DDA0DD]",
        subCategories: ["Piano", "Guitar", "Music Production", "Singing"],
        courseCount: 134,
        description: "Learn instruments and music production"
    }
];

const CategoriesPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    
    const filteredCategories = allCategories.filter(category =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.subCategories.some(sub => sub.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#481895] mb-2">Course Categories</h1>
                <p className="text-gray-600">Explore our wide range of learning categories</p>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md mb-12">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                    type="text"
                    placeholder="Search categories..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCategories.map((category) => (
                    <div
                        key={category.id}
                        className="flex flex-col bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 h-full"
                    >
                        <div className="flex-1 p-6 flex flex-col">
                            <div className="flex items-center gap-4 mb-4">
                                <div className={`w-16 h-16 flex-shrink-0 flex items-center justify-center rounded-xl ${category.color}`}>
                                    <Image
                                        src={category.icon}
                                        alt={category.name}
                                        width={50}
                                        height={50}
                                        className="w-12 h-12"
                                    />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-xl font-semibold text-gray-900 truncate">{category.name}</h3>
                                    <p className="text-sm text-gray-500">{category.courseCount} courses</p>
                                </div>
                            </div>
                            
                            <p className="text-gray-600 mb-4 line-clamp-2">{category.description}</p>
                            
                            <div className="mt-auto">
                                <p className="text-sm font-medium text-gray-700 mb-2">Popular Subjects:</p>
                                <div className="flex flex-wrap gap-2">
                                    {category.subCategories.map((sub, index) => (
                                        <span
                                            key={index}
                                            className={`text-xs px-3 py-1 rounded-full ${category.color} bg-opacity-20 truncate`}
                                        >
                                            {sub}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        <div className="border-t border-gray-100 p-4 bg-gray-50 mt-auto">
                            <button 
                                className="w-full text-center text-[#481895] font-medium hover:underline"
                                onClick={() => {/* Add navigation logic */}}
                            >
                                Browse Category
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredCategories.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No categories found matching your search.</p>
                </div>
            )}
        </div>
    );
};

export default CategoriesPage;