import React from "react";
import Link from "next/link";

const benefits = [
  {
    id: 1,
    title: "Learn from Experts",
    description: "Gain knowledge directly from industry professionals with years of experience.",
    bgColor: "bg-[#5b2ba9]",
    textColor: "text-white",
    btnColor: "bg-white text-[#5b2ba9]",
  },
  {
    id: 2,
    title: "Practical Projects",
    description: "Work on real world projects that help you apply what you learn in a meaningful way.",
    bgColor: "bg-[#ff7f50]",
    textColor: "text-white",
    btnColor: "bg-white text-[#ff7f50]",
  },
  {
    id: 3,
    title: "Career Growth and Mentorship",
    description: "Receive guidance from professionals to help you grow and succeed in your tech career.",
    bgColor: "bg-[#2e8b57]",
    textColor: "text-white",
    btnColor: "bg-white text-[#2e8b57]",
  },
];


const WhyChooseUs = () => {
  return (
    <div className="mt-20 mb-20 md:mb-8">
      <p className="text-[#481895] text-2xl md:text-4xl font-semibold">Why Choose Us?</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12 md:mt-20">
        {benefits.map((benefit) => (
          <div
            key={benefit.id}
            className={`p-10 rounded-lg shadow-md flex flex-col items-center ${benefit.bgColor} ${benefit.textColor}`}
          >
            <h3 className="text-2xl font-semibold mb-4">{benefit.title}</h3>
            <p className="text-center text-lg">{benefit.description}</p>
            <Link href='/login'>
              <button
                className={`btn btn-active btn-neutral bg-white outline-none mt-4 hover:text-white ${benefit.btnColor}`}
              >
                Get Started
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
