'use client'
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

const Dashboard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [token, setToken] = useState(null);
  const [name, setName] = useState(null);
  const [role, setRole] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]); // User's courses
  const [recommendedCourses, setRecommendedCourses] = useState([]); // Suggested courses

  useEffect(() => {
    const urlToken = searchParams.get("token");
    const urlName = searchParams.get("name");
    const urlRole = searchParams.get("role");

    if (urlToken) {
      // Save values in cookies
      Cookies.set("token", urlToken, { secure: true, sameSite: "None", path: "/" });
      Cookies.set("name", urlName, { secure: true, sameSite: "None", path: "/" });
      Cookies.set("role", urlRole, { secure: true, sameSite: "None", path: "/" });

      setToken(urlToken);
      setName(urlName);
      setRole(urlRole);

      window.location.href = `${window.location.origin}/dashboard`;
    } else {
      // Read from cookies
      const storedToken = Cookies.get("token");
      const storedName = Cookies.get("name");
      const storedRole = Cookies.get("role");

      if (storedToken) setToken(storedToken);
      if (storedName) setName(storedName);
      if (storedRole) setRole(storedRole);
    }

    // Fetch enrolled courses (Replace with API call)
    setEnrolledCourses([
      { id: 1, title: "React for Beginners", progress: 50 },
      { id: 2, title: "Node.js Advanced", progress: 75 }
    ]);

    // Fetch recommended courses (Replace with API call)
    setRecommendedCourses([
      { id: 3, title: "Next.js Masterclass" },
      { id: 4, title: "TailwindCSS Deep Dive" }
    ]);
  }, [searchParams]);

  // Logout function
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("name");
    Cookies.remove("role");
    router.push("/login");
  };

  return (
    <div>
      <h1>Welcome, {name ? name : "Guest"}!</h1>
      <p>Role: {role}</p>

      {/* Enrolled Courses */}
      <h2>Your Enrolled Courses</h2>
      {enrolledCourses.length > 0 ? (
        <ul>
          {enrolledCourses.map((course) => (
            <li key={course.id}>
              {course.title} - Progress: {course.progress}%
            </li>
          ))}
        </ul>
      ) : (
        <p>No enrolled courses yet.</p>
      )}

      {/* Recommended Courses */}
      <h2>Recommended Courses</h2>
      {recommendedCourses.length > 0 ? (
        <ul>
          {recommendedCourses.map((course) => (
            <li key={course.id}>{course.title}</li>
          ))}
        </ul>
      ) : (
        <p>No recommendations available.</p>
      )}

      {/* Logout Button */}
      <button onClick={handleLogout} style={{ marginTop: "20px", padding: "10px" }}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
