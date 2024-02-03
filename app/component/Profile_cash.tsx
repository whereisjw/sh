import React from "react";

const Profile_cash = () => {
  return (
    <>
      <div className="bg-gray-500 grid grid-cols-2 border shadow-md rounded-lg px-2 py-4 my-5 text-sm lg:text-base">
        <div className="col-span-1   flex flex-col items-center justify-center border-r border-gray-400 ">
          <span className="text-white ">0원</span>
          <span className="text-gray-400 font-semibold">히포캐시</span>
        </div>
        <div className="col-span-1   flex flex-col items-center justify-center">
          <span className="text-white">0원</span>
          <span className="text-gray-400 font-semibold">히포쿠폰</span>
        </div>
      </div>
    </>
  );
};

export default Profile_cash;
