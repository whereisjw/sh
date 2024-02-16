import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const DMLoading = () => {
  return (
    <>
      {[1, 2, 3, 4].map((value, index) => (
        <div key={index} className="flex">
          <Skeleton
            width={80}
            height={80}
            borderRadius={100}
            className="w-20 h-20 bg-gray-500 rounded-full"
          />
          <div className="pl-3  w-full">
            <div className="flex items-center justify-between">
              <Skeleton width={40} />
              <Skeleton width={50} />
            </div>
            <Skeleton width={70} />
          </div>
        </div>
      ))}
    </>
  );
};
export default DMLoading;
