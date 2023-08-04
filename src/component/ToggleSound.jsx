import React, { useEffect, forwardRef, useRef } from "react";
import { motion } from "framer-motion";

const ToggleSound = forwardRef(
  ({ value, onChange, isPlaying, setIsPlaying, src, ...delegated }, ref) => {
    return (
      <>
        <button
          type="button"
          role="switch"
          aria-checked={value}
          className={`w-[80px] h-[40px] flex justify-center items-center border-none rounded-[1000px] bg-none ${
            value ? `bg-primary-blue` : `bg-gray-300`
          }`}
          style={{ backgroundColor: value ? "#0000FF" : "gray" }}
          onClick={() => onChange(!value)}
          {...delegated}
        >
          <motion.svg
            initial={false}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 40,
            }}
            animate={{
              x: value ? "100%" : "-100%",
            }}
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#465F82"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            enableBackground="true"
            className="bg-white p-1 rounded-full"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </motion.svg>
          {value && (
            <audio
              ref={ref}
              src={src}
              onEnded={() => {
                setIsPlaying(false);
              }}
            ></audio>
          )}
        </button>
      </>
    );
  },
);

export { ToggleSound }; // Named export

export default ToggleSound;
