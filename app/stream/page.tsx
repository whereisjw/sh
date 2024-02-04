import React from "react";
import StreamList from "./StreamList";

const page = () => {
  return (
    <div className="py-10 px-4 space-y-4">
      <StreamList />

      <button className="fixed bottom-24 right-5 hover:bg-teal-500 cursor-pointer transition-colors bg-teal-400 border-transparent rounded-full p-4 text-white shadow-xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
          />
        </svg>
      </button>
    </div>
  );
};

export default page;
