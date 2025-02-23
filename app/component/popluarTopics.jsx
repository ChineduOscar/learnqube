import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import business from '../assets/business.svg'
import design from '../assets/design.svg'
import animation from '../assets/animation.svg'
import photography from '../assets/photography.svg'
import webDesign from '../assets/webDesign.svg'

const categories = [
    { id: 1, name: "Business", icon: business },
    { id: 2, name: "Design", icon: design },
    { id: 3, name: "Marketing", icon: business },
    { id: 4, name: "Photography", icon: photography },
    { id: 5, name: "3D Animation", icon: animation },
    { id: 6, name: "Web Development", icon: webDesign },
]

const bgColors = [
    "bg-[#FFD700]",
    "bg-[#FF6347]",
    "bg-[#20B2AA]", 
    "bg-[#FF69B4]",
    "bg-[#9370DB]",  
    "bg-[#4682B4]"   
]

const PopularTopics = () => {
  return (
    <div className="w-full">
        <div className="flex items-center justify-between">
            <p className="text-[#481895] text-[22px] md:text-3xl font-semibold">Popular Topics</p>
            <Link href='/categories'>
                <button className="btn btn-active btn-neutral md:text-2xl bg-black text-white px-6 py-2 rounded-md">
                    View All
                </button>
            </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10 mt-12 md:mt-20">
            {categories.map((category, index) => (
                <div 
                    key={category.id} 
                    className="flex items-center gap-2 md:gap-4 p-4 md:p-6 bg-white shadow-md rounded-xl border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-lg"
                >
                    <div className={`w-8 md:w-16 h-8 md:h-16 flex items-center justify-center rounded-xl ${bgColors[index]}`}>
                        <Image 
                            src={category.icon} 
                            alt={category.name} 
                            width={50} 
                            height={50} 
                            className="w-6 md:w-12 h-6 md:h-12"
                        />
                    </div>
                    <p className="text-xs md:text-lg font-semibold text-gray-900">{category.name}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default PopularTopics
