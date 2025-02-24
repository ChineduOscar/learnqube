import React from 'react'
import Image from 'next/image'
import { Lora } from 'next/font/google';
import Link from 'next/link';
import logo from '../assets/LearnQube.png'

const lora = Lora({
    weight: ['400', '700'],
    subsets: ['latin'],
  });

const Header = () => {
  return (
    <div className={`${lora.className} flex justify-between items-center px-6 md:px-12 lg:px-36 py-4 md:py-6 md:mb-10`}>
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

        <div className='flex items-center gap-4 md:gap-8'>
            <Link href='/login'>
                <div className='hidden md:block text-[18px] md:text-xl font-bold text-[#481895] hover:text-black'>Login</div>
            </Link>
            <Link href='/login'>
              <button className="btn btn-active btn-neutral text-[18px] md:text-xl bg-[#481895] text-white">Get started</button>
            </Link>
        </div>
    </div>
  )
}

export default Header