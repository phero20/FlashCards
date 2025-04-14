import React from "react";

export default function AnimatedFolder() {


  return (
    <div className="folder relative w-40 h-28">
   
      <div className="back absolute w-full h-full bg-yellow-500 rounded-t-md shadow-md z-0"></div>

      <div className="paper absolute w-11/12 h-5/6 bg-white top-6 left-6 rounded shadow-sm z-10"></div>
      <div className="paper absolute w-11/12 h-5/6 bg-white top-4 left-4 rounded shadow-sm z-20"></div>
      <div className="paper absolute w-11/12 h-5/6 bg-white top-2 left-2 rounded shadow-sm z-30"></div>

      <div className="cover absolute w-full h-3/4 bg-yellow-400 rounded-t-md shadow-lg z-40"></div>
    </div>
  
  );
}
