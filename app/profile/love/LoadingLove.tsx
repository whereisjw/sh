import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingLove = () => {
  return (
    <>
      {[1, 2, 3, 4].map((value, index) => (
        <div key={index} className="col-span-1">
          <Skeleton className="h-56 w-full bg-gray-400 rounded-md shadow-sm px-4" />
          <Skeleton className="text-sm text-gray-700" />
          <div className="flex items-center justify-between">
            <Skeleton
              width={50}
              className="text-sm font-medium text-gray-500"
            />

            <div className="flex items-center space-x-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
              <Skeleton className="w-full" width={10} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default LoadingLove;
