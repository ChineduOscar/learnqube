'use client'
import React,{ useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Cookies from 'js-cookie';
import heroImg from '../assets/heroImage.png';

const Hero = () => {
  const [token, setToken] = useState(null);
  
  useEffect(() => {
    setToken(Cookies.get('token'));
  }, []);
  
  return (
    <div className="relative w-full flex flex-col md:flex-row items-center justify-between gap-2 md:gap-6 md-12 md:mb-20">
      <div className='w-full md:w-[60%]'>
        <p className="text-4xl md:text-[45px] lg:text-[60px] font-semibold mb-10 lg:mb-20 leading-[45px] md:leading-[70px]">Empower Your Career with Cutting-Edge <span className="bg-[#5b2ba9] text-white">Tech</span> Skills</p>
        <p className="md:text-xl text-[#545454] leading-8 mb-10 lg:mb-20">Unlock your potential with expertly crafted courses in coding, design, data science, and more. Start your learning journey today and shape your future in tech!</p>
        <Link href={token ? '/dashboard': '/login'}>
          <button className="text-2xl md:text-3xl bg-[#481895] text-white px-5 py-5 rounded-md font-semibold">Get started</button>
        </Link>
      </div>
      <div className='w-full md:w-1/2'>
        <Image 
          src={heroImg} 
          alt="hero-image"
          width={500}
          height={500}
          className="w-full md:w-[1/2] h-[40rem] object-contain bg-white"
          />
      </div>
    </div>
  )
}

export default Hero