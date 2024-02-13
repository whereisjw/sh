import Link from "next/link";
import React from "react";
import Profile_cash from "../component/Profile_cash";

import Profile from "../component/Profile";
import Profile_reviews from "../component/Profile_reviews";
import Profile_upload from "../component/Profile_upload";

const page = () => {
  return (
    <div className="py-10 px-4">
      <Profile />
      <Profile_cash />
      <Profile_upload />
      {/*      <div className="mt-10 flex justify-around">
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 bg-teal-500 rounded-full flex items-center justify-center text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-700 mt-2">
            판매내역
          </span>
        </div>
        <div>
          <Link
            href={"/profile/buy"}
            className="w-14 h-14 bg-teal-500 rounded-full flex items-center justify-center text-white"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              ></path>
            </svg>
          </Link>
          <span className="text-sm font-medium text-gray-700 mt-2">
            구매내역
          </span>
        </div>
        <div>
          <Link
            href={"/profile/love"}
            className="w-14 h-14 bg-teal-500 rounded-full flex items-center justify-center text-white"
          >
            <svg
              className="w-6 h-6"
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
          </Link>
          <span className="text-sm font-medium text-gray-700 mt-2">
            관심목록
          </span>
        </div>
      </div> */}
      {/*       <Profile_reviews /> */}
    </div>
  );
};

export default page;
