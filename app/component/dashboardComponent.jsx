'use client'
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Play, LogOut, Mail, Phone, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import { Lora } from 'next/font/google';
import logo from '../assets/LearnQube.png';

const lora = Lora({
  weight: ['400', '700'],
  subsets: ['latin'],
});

const DashboardComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  // Sample courses data
  const courses = [
    {
      id: 1,
      title: "React Crash Course",
      category: "Website Development",
      thumbnail: "/api/placeholder/400/320"
    },
    {
      id: 2,
      title: "Mastering UI/UX Design",
      category: "Design",
      thumbnail: "/api/placeholder/400/320"
    },
    {
      id: 3,
      title: "Mastering Portrait Photography",
      category: "Photography",
      thumbnail: "/api/placeholder/400/320"
    },
  ];

  useEffect(() => {
    const urlToken = searchParams.get("token");
    const urlName = searchParams.get("name");
    const urlRole = searchParams.get("role");
    const urlEmail = searchParams.get("email");

    if (urlToken) {
      Cookies.set('token', urlToken, { 
        secure: true, 
        sameSite: 'None',
        path: '/'
      });
      
      if (urlName) {
        Cookies.set('userName', urlName, { 
          secure: true, 
          sameSite: 'None',
          path: '/'
        });
      }
      
      if (urlRole) {
        Cookies.set('userRole', urlRole, { 
          secure: true, 
          sameSite: 'None',
          path: '/'
        });
      }

      if (urlEmail) {
        Cookies.set('userEmail', urlEmail, { 
          secure: true, 
          sameSite: 'None',
          path: '/'
        });
      }

      setToken(urlToken);
      setUserName(urlName);
      setUserRole(urlRole);
      setUserEmail(urlEmail);

      window.location.href = `${window.location.origin}/dashboard`;
    } else {
      const storedToken = Cookies.get("token");
      const storedName = Cookies.get("userName");
      const storedRole = Cookies.get("userRole");
      const storedEmail = Cookies.get("userEmail")

      if (storedToken) {
        setToken(storedToken);
        setUserName(storedName);
        setUserRole(storedRole);
        setUserEmail(storedEmail);
      }
    }
  }, [searchParams, router]);


  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('userName');
    Cookies.remove('userRole');
  
    router.push('/login');
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className={`${lora.className} flex justify-between items-center px-6 md:px-12 lg:px-36 py-4 md:py-6 bg-white shadow-sm`}>
        <Link href={'/'}>
          <div className='flex items-center gap-6'>
            <div>
            <Image
                src={logo}
                alt='learnQube'
                height={80}
                width={80}
                className="h-10 w-10 md:h-16 md:w-16 lg:h-20 lg:w-20"
              />
            </div>
            <span className='hidden md:block text-[#481895] font-bold text-2xl'>LEARNQUBE</span>
          </div>
        </Link>

        <div className='relative'>
          <div 
            className="flex items-center gap-2 cursor-pointer p-2 rounded-full hover:bg-gray-100"
            onClick={toggleUserMenu}
          >
            <span className="font-medium hidden md:block">{userName || 'User'}</span>
            <div className="h-10 w-10 rounded-full bg-[#481895] flex items-center justify-center text-white">
              <User size={20} />
            </div>
          </div>
          
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <div className="px-4 py-2 text-sm text-gray-700 border-b">
                <p className="font-medium">{userName || 'User'}</p>
                <p className="text-gray-500">{userRole || 'Student'}</p>
                <p className="text-gray-500">{userEmail || 'No email available'}</p>
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto p-6 max-w-7xl">
        {/* Welcome & Motivational Section */}
        <div className="bg-gradient-to-r from-[#481895] to-purple-700 text-white rounded-xl p-6 md:p-8 mb-8 flex flex-col md:flex-row items-center">
          <div className="md:w-2/3">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">Welcome back, {userName || 'Learner'}!</h1>
            <p className="text-lg mb-4">
              "Learning is not attained by chance, it must be sought for with ardor and attended to with diligence." — Abigail Adams
            </p>
            <p className="text-sm md:text-base opacity-90">
              Ready to continue your learning journey? You've got courses waiting for you.
            </p>
          </div>
          <div className="md:w-1/3 flex justify-center mt-6 md:mt-0">
            <div className="bg-white/20 p-4 rounded-full">
              <div className="h-32 w-32 rounded-full bg-purple-600 flex items-center justify-center">
                <span className="text-4xl font-bold">🚀</span>
              </div>
            </div>
          </div>
        </div>

        {token ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2">
              <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
                <h2 className="text-xl font-bold text-purple-800 mb-6">Your Courses</h2>
                
                <div className="grid gap-6">
                  {courses.map((course) => (
                    <div key={course.id} className="flex flex-col sm:flex-row bg-gray-50 rounded-lg overflow-hidden transition-transform hover:shadow-md">
                      <div className="sm:w-1/3 h-52 sm:h-auto relative">
                        <img 
                          src={course.thumbnail} 
                          alt={course.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="sm:w-2/3 p-4 flex flex-col justify-between">
                        <div>
                          <span className="text-sm font-medium text-white bg-gray-600 rounded-lg w-fit p-1">{course.category}</span>
                          <h3 className="text-lg font-semibold mt-2">{course.title}</h3>
                        </div>
                        <button className="mt-4 bg-purple-800 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors flex items-center justify-center">
                          <Play size={16} className="mr-2 text-white" />
                          Watch
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
      
                <div className="mt-6 text-center">
                  <Link href="/courses" className="text-purple-800 font-medium hover:underline">
                    Browse more courses
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Right Column */}
            <div>
              {/* User Details Card */}
              <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
                <h2 className="text-xl font-bold text-[#481895] mb-4">User Details</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-[#481895]">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{userName || 'Not available'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-[#481895]">
                      <span className="font-bold">R</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Role</p>
                      <p className="font-medium">{userRole || 'Not available'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-[#481895]">
                      <span className="font-bold">E</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{userEmail || 'No email available'}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              
              {/* Contact Admin Card */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-bold text-[#481895] mb-4">Contact Admin</h2>
                <p className="text-sm text-gray-600 mb-4">Need help? Reach out to our admin team.</p>
                
                <a 
                  href="mailto:admin@learnqube.com" 
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-3 hover:bg-gray-100 transition-colors"
                >
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-[#481895]">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">chinedunnadozieo@gmail.com</p>
                  </div>
                </a>
                
                <a 
                  href="tel:+1234567890" 
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-[#481895]">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">+234 812 2551 232</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-xl shadow-sm flex justify-center items-center">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-t-[#481895] border-r-[#481895] border-b-transparent border-l-transparent mb-4"></div>
              <p className="text-lg">Loading your dashboard...</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardComponent;