'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import photographyThumbnail from '../../assets/photographyThumbnail.jpg';
import designThumbnail from '../../assets/designThumbnail.jpg';
import websiteThumbnail from '../../assets/websiteThumbnail.jpg';

// Extended course data
const allCourses = [
    {
        id: 1,
        title: "React Crash Course",
        category: "Website Development",
        author: "Chinedu Oscar",
        thumbnail: websiteThumbnail,
        price: 49.99,
        rating: 4.8,
        students: 1234
    },
    {
        id: 2,
        title: "Mastering UI/UX Design",
        category: "Design",
        author: "Chinedu Oscar",
        thumbnail: designThumbnail,
        price: 59.99,
        rating: 4.7,
        students: 856
    },
    {
        id: 3,
        title: "Mastering Portrait Photography",
        category: "Photography",
        author: "Chinedu Oscar",
        thumbnail: photographyThumbnail,
        price: 39.99,
        rating: 4.9,
        students: 2341
    },
    // Adding more courses with the same structure
    {
        id: 4,
        title: "Advanced JavaScript Concepts",
        category: "Website Development",
        author: "Chinedu Oscar",
        thumbnail: websiteThumbnail,
        price: 69.99,
        rating: 4.6,
        students: 1567
    },
    {
        id: 5,
        title: "Mobile App Design Fundamentals",
        category: "Design",
        author: "Chinedu Oscar",
        thumbnail: designThumbnail,
        price: 44.99,
        rating: 4.5,
        students: 923
    },
    {
        id: 6,
        title: "Landscape Photography Masterclass",
        category: "Photography",
        author: "Chinedu Oscar",
        thumbnail: photographyThumbnail,
        price: 54.99,
        rating: 4.7,
        students: 1432
    }
];

const categories = ["All", "Website Development", "Design", "Photography"];

const AllCoursesPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 6;

    // Filter courses based on search and category
    const filteredCourses = allCourses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            course.author.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Calculate pagination
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

    return (
        <div className="px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#481895] mb-2">All Courses</h1>
                <p className="text-gray-600">Explore our wide range of courses and start learning today</p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Search courses..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto">
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant={selectedCategory === category ? "default" : "outline"}
                            onClick={() => setSelectedCategory(category)}
                            className={`whitespace-nowrap ${
                                selectedCategory === category ? "bg-[#481895]" : ""
                            }`}
                        >
                            {category}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentCourses.map((course) => (
                    <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="relative h-48">
                            <Image
                                src={course.thumbnail}
                                alt={course.title}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                        <CardContent className="p-4">
                            <p className="mb-2 text-sm font-medium text-white bg-[#545454] rounded-lg px-2 w-fit">
                                {course.category}
                            </p>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">{course.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">By {course.author}</p>
                            <Button className="w-full bg-[#481895]">
                                Enroll Now
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                    <Button
                        variant="outline"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <Button
                            key={i + 1}
                            variant={currentPage === i + 1 ? "default" : "outline"}
                            onClick={() => setCurrentPage(i + 1)}
                            className={currentPage === i + 1 ? "bg-[#481895]" : ""}
                        >
                            {i + 1}
                        </Button>
                    ))}
                    <Button
                        variant="outline"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            )}
        </div>
    );
};

export default AllCoursesPage;