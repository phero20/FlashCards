import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { X, ChevronRight, ChevronLeft } from "lucide-react";
import repeat from "../assets/repeat.png";

export default function FlipCard(props) {
  const [isFlipped, setIsFlipped] = useState(false);

  const frontImageContainerRef = useRef(null);
  const backImageContainerRef = useRef(null);

  const scrollImage = (ref, direction) => {
    if (ref.current) {
      const width = ref.current.offsetWidth;
      ref.current.scrollBy({
        left: direction * width,
        behavior: "smooth",
      });
    }
  };

  const renderSide = (isBack) => {
    const containerRef = isBack
      ? backImageContainerRef
      : frontImageContainerRef;
    const contentText = isBack ? props.answer : props.question;

    return (
      <div
        className={`absolute inset-0 rounded-xl shadow-xl flex flex-col items-center p-4 pt-4 z-10 ${
          isBack
            ? "bg-white dark:bg-black text-black dark:text-white"
            : "bg-white dark:bg-black text-black dark:text-white"
        }`}
        style={{
          transform: isBack ? "rotateY(180deg)" : "none",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          height: "100%",
        }}
      >
       
        <h1 className="text-xl font-semibold mb-4">
          {isBack ? "Answer Side" : "Question Side"}
        </h1>

    
        <div className="absolute top-1 right-1 z-20 p-2">
          <button
            type="button"
            onClick={() => {
              containerRef.current?.scrollTo({ left: 0, behavior: "smooth" });
              setIsFlipped(false);
              props.onClose();
            }}
            className="hover:text-gray-500 transition"
          >
            <X size={25} />
          </button>
        </div>

    
        <div className="relative w-full mb-4">
          {props.images.length > 1 && (
            <button
              onClick={() => scrollImage(containerRef, -1)}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 bg-opacity-30 p-2 rounded-full"
            >
              <ChevronLeft size={24} />
            </button>
          )}

<div
  ref={containerRef}
  className="flex overflow-x-auto snap-x snap-mandatory w-full scrollbar-hide"
  style={{
    scrollBehavior: "smooth",
    WebkitOverflowScrolling: "touch",
    msOverflowStyle: "none", 
    scrollbarWidth: "none",  
  }}
>
            {props.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index}`}
                className="min-w-full max-w-full h-[37vh] object-contain snap-start rounded-xl"
              />
            ))}
          </div>

          {props.images.length > 1 && (
            <button
              onClick={() => scrollImage(containerRef, 1)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 bg-opacity-30 p-2 rounded-full"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>

     
        <div
          className="w-full flex-1 overflow-y-auto px-2 text-center scrollbar-hide"
          style={{
            WebkitOverflowScrolling: "touch",
            touchAction: "pan-y",
            msOverflowStyle: "none", 
            scrollbarWidth: "none", 
          }}
        >
          <p className="text-lg break-words whitespace-pre-wrap">
            {contentText}
          </p>
        </div>

      
        <button
          onClick={() => setIsFlipped(!isBack)}
          className="absolute bottom-3 right-3 px-2 py-2 bg-gray-600 bg-opacity-65 rounded-full"
        >
          <img src={repeat} alt="flip" className="w-8" />
        </button>
      </div>
    );
  };

  return (
    <div className="flex justify-center items-center relative">
      <div
        className="relative w-[95vw] sm:w-96 h-[90vh]"
        style={{ perspective: 1000 }}
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {renderSide(false)}
          {renderSide(true)}
        </motion.div>
      </div>
    </div>
  );
}
