'use client'
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

const bgColors = [
    "bg-[#FFD700]",
    "bg-[#FF6347]",
    "bg-[#20B2AA]", 
    "bg-[#FF69B4]",
    "bg-[#9370DB]",  
    "bg-[#4682B4]"   
];

const CategoriesPage = () => {
    const router = useRouter();
    const courses = useSelector((state) => state.courses.courses);
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = () => {
            try {
                if (!courses || courses.length === 0) return;

                const uniqueCategories = [];
                const categoryIds = new Set();

                courses.forEach(course => {
                    if (course.category && !categoryIds.has(course.category._id)) {
                        const relatedCourses = courses.filter(c => 
                            c.category && c.category._id === course.category._id);
                        
                        const allSubCategories = [];
                        relatedCourses.forEach(c => {
                            if (c.subCategories && Array.isArray(c.subCategories)) {
                                c.subCategories.forEach(sub => {
                                    if (!allSubCategories.some(existing => existing._id === sub._id)) {
                                        allSubCategories.push(sub);
                                    }
                                });
                            }
                        });

                        categoryIds.add(course.category._id);
                        uniqueCategories.push({
                            id: course.category._id,
                            name: course.category.name,
                            icon: course.category.icon,
                            description: course.category.description || "Explore this category",
                            subCategories: allSubCategories,
                            color: bgColors[uniqueCategories.length % bgColors.length]
                        });
                    }
                });

                setCategories(uniqueCategories);
            } catch (error) {
                console.error('Error processing courses:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [courses]);

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (category.subCategories?.some(sub => 
            sub.name && sub.name.toLowerCase().includes(searchQuery.toLowerCase())
        ))
    );

    const handleBrowseCategory = (categoryId) => {
        router.push(`/courses?category=${categoryId}`);
    };

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
            {loading ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">Loading categories...</p>
                </div>
            ) : (
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
                                    </div>
                                </div>
                                
                                <p className="text-gray-600 mb-4 line-clamp-2">{category.description}</p>
                                
                                <div className="mt-auto">
                                    <div className="flex flex-wrap gap-2">
                                        {category.subCategories && category.subCategories.length > 0 ? (
                                            category.subCategories.map((sub, index) => (
                                                <span
                                                    key={sub._id || index}
                                                    className={`text-xs px-3 py-1 rounded-full ${bgColors[index % bgColors.length]} bg-opacity-20 truncate`}
                                                >
                                                    {sub.name}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-xs text-gray-500">No subcategories available</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="border-t border-gray-100 p-4 bg-gray-50 mt-auto">
                                <button 
                                    className="w-full text-center text-[#481895] font-medium hover:underline"
                                    onClick={() => handleBrowseCategory(category.id)}
                                >
                                    Browse Category
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!loading && filteredCategories.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No categories found matching your search.</p>
                </div>
            )}
        </div>
    );
};

export default CategoriesPage;