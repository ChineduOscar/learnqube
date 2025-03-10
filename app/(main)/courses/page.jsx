'use client'
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import Cookies from 'js-cookie';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import axiosInstance from '../../config'
import { useRouter, useSearchParams } from 'next/navigation';
import getYouTubeThumbnail from '../../utils/videoThumnail';

const AllCoursesPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const courses = useSelector((state) => state.courses.courses);
    const [processedCourses, setProcessedCourses] = useState([]);
    const [loadingCourseId, setLoadingCourseId] = useState(null);
    const [userEnrolledCourses, setUserEnrolledCourses] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [categories, setCategories] = useState(["All"]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 6;
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

    // Extract all unique categories from courses
    useEffect(() => {
        if (courses?.length > 0) {
            // Extract and create unique categories list
            const uniqueCategories = new Set();
            courses.forEach(course => {
                if (course.category && course.category.name) {
                    uniqueCategories.add(course.category.name);
                }
            });
            setCategories(["All", ...Array.from(uniqueCategories)]);
            
            // Process courses to add thumbnails
            const updatedCourses = courses.map(course => ({
                ...course,
                thumbnail: getYouTubeThumbnail(course.videoUrl),
            }));
            setProcessedCourses(updatedCourses);
            
            // Check for category param in URL
            const categoryParam = searchParams.get('category');
            if (categoryParam) {
                // Find the category name based on the ID
                const matchingCourse = courses.find(course => 
                    course.category && course.category._id === categoryParam
                );
                if (matchingCourse && matchingCourse.category.name) {
                    setSelectedCategory(matchingCourse.category.name);
                }
            }
        }
    }, [courses, searchParams]);

    // Filter courses based on search and category
    const filteredCourses = processedCourses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             (course.tutor && course.tutor.toLowerCase().includes(searchQuery.toLowerCase()));
                             
        const matchesCategory = selectedCategory === "All" || 
                               (course.category && course.category.name === selectedCategory);
                               
        return matchesSearch && matchesCategory;
    });

    // Pagination logic
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

    // Handle course click
    const handleCourseClick = (courseId) => {
        router.push(`/courses/${courseId}`);
    };

    const handlePayment = async (amount, courseId, event) => {
        console.log(email, amount, courseId)
        event.stopPropagation();
        
        try {
          setLoadingCourseId(courseId);
          if (!token) {
            router.push('/login');
            return;
          }

          if (userEnrolledCourses.some(enrolledCourse => 
            enrolledCourse?.course?._id === courseId)) {
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
            alert("Could not process payment. Please try again later.");
          }
        } catch (error) {
          console.log("Payment error:", error.response?.data || error.message);
          alert("Payment initialization failed. Please try again.");
        } finally {
          setLoadingCourseId(null);
        }
    };

    return (
        <div className="px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#481895] mb-2">All Courses</h1>
                <p className="text-gray-600">Explore our wide range of courses and start learning today</p>
            </div>
            
            {/* Search & Category Filter */}
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
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant={selectedCategory === category ? "default" : "outline"}
                            onClick={() => setSelectedCategory(category)}
                            className={`whitespace-nowrap ${selectedCategory === category ? "bg-[#481895]" : ""}`}
                        >
                            {category}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Courses Grid */}
            {currentCourses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentCourses.map((course) => (
                        <Card 
                            key={course._id} 
                            className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                            onClick={() => handleCourseClick(course._id)}
                        >
                            <div className="relative h-48 w-full">
                                <Image
                                    src={course.thumbnail || "/placeholder-course.jpg"}
                                    alt={course.title}
                                    fill
                                    style={{ objectFit: "cover" }}
                                    className="rounded-t-lg"
                                />
                            </div>
                            <CardContent className="p-4">
                                {course.category && course.category.name && (
                                    <p className="mb-2 text-sm font-medium text-white bg-[#545454] rounded-lg px-2 py-1 w-fit">
                                        {course.category.name}
                                    </p>
                                )}
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">{course.title}</h3>
                                <p className="text-sm text-gray-600 mb-2">By {course.tutor}</p>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="font-bold text-[#481895] w-1/2">${course.price?.toFixed(2) || 'Free'}</span>
                                    <Button 
                                        className="btn btn-active btn-neutral mt-4 bg-[#481895] text-white py-2 rounded-md text-sm font-medium flex items-center justify-center w-1/2" 
                                        onClick={(e) => handlePayment(course.price, course._id, e)}
                                        disabled={loadingCourseId === course._id}
                                    >
                                        {loadingCourseId === course._id ? 
                                            <span className="animate-spin border-4 border-white border-t-transparent rounded-full w-5 h-5"></span>
                                            : userEnrolledCourses.some(
                                            enrolledCourse => enrolledCourse?.course?._id === course._id
                                        ) ? 'Go to Dashboard' : 'Enroll Now'}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <p className="text-xl text-gray-500">No courses found matching your criteria.</p>
                </div>
            )}

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