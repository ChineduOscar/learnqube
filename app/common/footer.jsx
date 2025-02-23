import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white px-6 md:px-12 lg:px-36 py-4 md:py-6">
      <div className="px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-bold">LearnQube</h2>
          <p className="mt-4 text-gray-400">
            Master new skills with expert-led courses in coding, design, marketing, and more.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="text-gray-400 hover:text-white">About Us</Link></li>
            <li><Link href="/courses" className="text-gray-400 hover:text-white">Courses</Link></li>
            <li><Link href="/" className="text-gray-400 hover:text-white">Blog</Link></li>
            <li><Link href="/" className="text-gray-400 hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="text-gray-400 hover:text-white">FAQs</Link></li>
            <li><Link href="/" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
            <li><Link href="/" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="mt-10 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} LearnQube. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
