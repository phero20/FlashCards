import React from "react";
import Tick from "../assets/check.png";

export default function Logo() {
  return (
    <div className="w-screen relative h-40 flex items-center justify-center">
    {/* Centered Card */}
    <div className="flex flex-col gap-3 h-32 rounded-xl w-28 bg-green-400 p-3 pt-6 z-20 transform animated-left">
      <div className="bg-gray-200 h-3 w-5/6 rounded-full"></div>
      <div className="bg-gray-200 h-3 w-3/5 rounded-full"></div>
      <img src={Tick} alt="" className="w-8 h-8" />
    </div>
  
    {/* Card Rotated to the Left */}
    <div className="flex flex-col gap-3 h-32 rounded-xl w-28 bg-yellow-400 p-3 pt-6 absolute transform -translate-x-8 -rotate-12 z-10 animated-right2">
      <div className="bg-gray-200 h-3 w-5/6 rounded-full"></div>
      <div className="bg-gray-200 h-3 w-3/5 rounded-full"></div>
      <img src={Tick} alt="" className="w-8 h-8" />
    </div>
  
    {/* Card Rotated to the Right */}
    <div className="flex flex-col gap-3 h-32 rounded-xl w-28 bg-pink-400 p-3 pt-6 absolute transform translate-x-8 rotate-12 z-10 animated-left2">
      <div className="bg-gray-200 h-3 w-5/6 rounded-full"></div>
      <div className="bg-gray-200 h-3 w-3/5 rounded-full"></div>
      <img src={Tick} alt="" className="w-8 h-8" />
    </div>
  
    {/* Card Positioned Above */}
    <div className="flex flex-col gap-3 h-32 rounded-xl w-28 bg-red-500 p-3 pt-6 absolute -translate-y-4 z-15 animated-right">
      <div className="bg-gray-200 h-3 w-5/6 rounded-full"></div>
      <div className="bg-gray-200 h-3 w-3/5 rounded-full"></div>
      <img src={Tick} alt="" className="w-8 h-8" />
    </div>
  </div>
  );
}
