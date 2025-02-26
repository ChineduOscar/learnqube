'use client'
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, BookOpen, Clock, Users, Award } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SingleCoursePage = () => {
    const { courseId } = useParams();
    const router = useRouter();
    const courses = useSelector((state) => state.courses.courses);
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEnrolled, setIsEnrolled] = useState(false);

    useEffect(() => {
        if (courses?.length > 0 && courseId) {
            const foundCourse = courses.find(c => c._id === courseId);
            if (foundCourse) {
                setCourse(foundCourse);
                // Check if user is enrolled (you'll need to implement user auth check)
                setIsEnrolled(foundCourse.enrolledUsers?.includes('current-user-id'));
            }
            setLoading(false);
        }
    }, [courses, courseId]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <p className="text-xl text-gray-600">Loading course...</p>
                </div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <p className="text-xl text-gray-600">Course not found</p>
                    <Button 
                        className="mt-4 bg-[#481895]"
                        onClick={() => router.push('/courses')}
                    >
                        Back to Courses
                    </Button>
                </div>
            </div>
        );
    }

    // Extract video ID from YouTube URL
    const getYouTubeEmbedUrl = (url) => {
        if (!url) return null;
        
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        
        return (match && match[2].length === 11)
            ? `https://www.youtube.com/embed/${match[2]}`
            : null;
    };

    const embedUrl = getYouTubeEmbedUrl(course.videoUrl);

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Back Button */}
            <button 
                onClick={() => router.back()}
                className="flex items-center gap-2 text-[#481895] hover:underline mb-6"
            >
                <ArrowLeft size={16} />
                <span>Back to Courses</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    {/* Video Player */}
                    <div className="bg-black rounded-lg overflow-hidden aspect-video mb-6">
                        {embedUrl ? (
                            <iframe
                                src={embedUrl}
                                className="w-full h-full"
                                title={course.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-800">
                                <p className="text-white">Video unavailable</p>
                            </div>
                        )}
                    </div>

                    {/* Course Information Tabs */}
                    <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                            <TabsTrigger value="reviews">Reviews</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="overview" className="p-4">
                            <h2 className="text-2xl font-bold mb-4">About This Course</h2>
                            <p className="text-gray-700">{course.description}</p>
                            
                            <h3 className="text-xl font-semibold mt-6 mb-3">What You'll Learn</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <li className="flex items-start gap-2">
                                    <div className="text-[#481895] mt-1">•</div>
                                    <div>Understand {course.category?.name} fundamentals</div>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="text-[#481895] mt-1">•</div>
                                    <div>Apply practical skills in real-world scenarios</div>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="text-[#481895] mt-1">•</div>
                                    <div>Build your own projects from scratch</div>
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="text-[#481895] mt-1">•</div>
                                    <div>Gain confidence in {course.subCategories?.[0]?.name || course.category?.name}</div>
                                </li>
                            </ul>
                        </TabsContent>
                        
                        <TabsContent value="curriculum" className="p-4">
                            <h2 className="text-2xl font-bold mb-4">Course Curriculum</h2>
                            <div className="space-y-4">
                                <div className="border rounded-lg overflow-hidden">
                                    <div className="bg-gray-100 p-3 font-medium flex justify-between">
                                        <span>Section 1: Introduction</span>
                                        <span className="text-gray-500">25 mins</span>
                                    </div>
                                    <div className="p-3 border-t">
                                        <div className="flex items-center justify-between py-2">
                                            <div className="flex items-center gap-2">
                                                <BookOpen size={16} className="text-[#481895]" />
                                                <span>Welcome to the Course</span>
                                            </div>
                                            <span className="text-sm text-gray-500">5:30</span>
                                        </div>
                                        <div className="flex items-center justify-between py-2">
                                            <div className="flex items-center gap-2">
                                                <BookOpen size={16} className="text-[#481895]" />
                                                <span>Course Overview</span>
                                            </div>
                                            <span className="text-sm text-gray-500">8:45</span>
                                        </div>
                                        <div className="flex items-center justify-between py-2">
                                            <div className="flex items-center gap-2">
                                                <BookOpen size={16} className="text-[#481895]" />
                                                <span>Getting Started</span>
                                            </div>
                                            <span className="text-sm text-gray-500">10:20</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="border rounded-lg overflow-hidden">
                                    <div className="bg-gray-100 p-3 font-medium flex justify-between">
                                        <span>Section 2: Core Concepts</span>
                                        <span className="text-gray-500">45 mins</span>
                                    </div>
                                    <div className="p-3 border-t">
                                        <div className="flex items-center justify-between py-2 opacity-50">
                                            <div className="flex items-center gap-2">
                                                <BookOpen size={16} className="text-[#481895]" />
                                                <span>Fundamentals of {course.category?.name}</span>
                                            </div>
                                            <span className="text-sm text-gray-500">12:15</span>
                                        </div>
                                        <div className="flex items-center justify-between py-2 opacity-50">
                                            <div className="flex items-center gap-2">
                                                <BookOpen size={16} className="text-[#481895]" />
                                                <span>Key Principles</span>
                                            </div>
                                            <span className="text-sm text-gray-500">15:30</span>
                                        </div>
                                        <div className="flex items-center justify-between py-2 opacity-50">
                                            <div className="flex items-center gap-2">
                                                <BookOpen size={16} className="text-[#481895]" />
                                                <span>Practical Applications</span>
                                            </div>
                                            <span className="text-sm text-gray-500">18:40</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                        
                        <TabsContent value="reviews" className="p-4">
                            <h2 className="text-2xl font-bold mb-4">Student Reviews</h2>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#481895] flex items-center justify-center text-white font-bold flex-shrink-0">
                                        JD
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-semibold">John Doe</h4>
                                            <div className="flex">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <svg 
                                                        key={star}
                                                        className={`w-4 h-4 ${star <= 5 ? "text-yellow-400" : "text-gray-300"}`}
                                                        fill="currentColor" 
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">2 weeks ago</p>
                                        <p className="mt-2">Excellent course! The instructor explains complex concepts in an easy-to-understand way. I've learned so much already.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#20B2AA] flex items-center justify-center text-white font-bold flex-shrink-0">
                                        AS
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-semibold">Alice Smith</h4>
                                            <div className="flex">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <svg 
                                                        key={star}
                                                        className={`w-4 h-4 ${star <= 4 ? "text-yellow-400" : "text-gray-300"}`}
                                                        fill="currentColor" 
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">1 month ago</p>
                                        <p className="mt-2">Very practical course with real-world examples. The pacing could be a bit better in some sections, but overall a great learning experience.</p>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <Card className="sticky top-4">
                        <CardContent className="p-0">
                            <div className="p-6">
                                <h2 className="text-2xl font-bold mb-1">{course.title}</h2>
                                <p className="text-gray-600 mb-4">Instructor: {course.tutor}</p>
                                <div className="text-sm text-gray-600">
                                    <p className="mb-2">This course includes:</p>
                                    <ul className="space-y-2">
                                        <li className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-[#481895]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>Full lifetime access</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <svg className="w-5 h-5 text-[#481895]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>Access on mobile and TV</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default SingleCoursePage;