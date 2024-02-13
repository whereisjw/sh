import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const Loading = () => {
  return (
    <div className="flex flex-col space-y-5 py-10">
      {[1, 2, 3, 4].map((v) => (
        <div
          key={v}
          className="flex justify-between border-b pb-4 cursor-pointer"
        >
          <div className="flex space-x-4">
            <Skeleton
              width={80}
              height={80}
              className="w-20 h-20 bg-gray-400 rounded-md shadow-sm px-4"
            />
            <div className="pt-2 flex flex-col">
              <h3 className="text-sm font-medium text-gray-900 w-full">
                <Skeleton width={150} />
              </h3>
              <span className="text-xs text-gray-500">
                <Skeleton />
              </span>
              <span className="font-medium mt-1 text-gray-900">
                <Skeleton />
              </span>
            </div>
          </div>
          <div className="flex items-end justify-end space-x-2">
            <div className="flex items-center text-sm text-gray-600 space-x-0.5">
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
              <span>
                <Skeleton width={10} />
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loading;
