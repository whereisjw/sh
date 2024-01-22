"use client";
import Link, { useRouter } from "next/navigation";
import React from "react";

const Header = () => {
  const router = useRouter();
  return (
    <>
      <div className="mt-[15vh] ">
        <div className=" z-10 bg-white w-full h-[15vh] border-b border-gray-300 fixed top-0">
          <div className="h-[4vh]   flex items-center justify-center bg-teal-500 text-white">
            <div className="text-center text-[12px] flex justify-center items-center font-medium">
              <span>중고 홈짐에 오신걸 환영합니다.</span>
            </div>
          </div>
          <div className="flex w-full justify-between items-center h-[11vh]   py-4 px-8">
            <div className="lg:block hidden w-[33%] text-[12px] space-x-[15px] font-medium">
              <span className="cursor-pointer">소개</span>
            </div>
            <div className="flex items-center w-[33%] lg:hidden">
              <span className=" text-[12px] flex items-center justify-center">
                영상
              </span>
            </div>
            <div
              onClick={() => {
                router.push("/");
              }}
              className="w-[33%] flex justify-center text-4xl font-bold cursor-pointer text-teal-500">
              중고홈짐
            </div>
            <div className="hidden w-[33%] text-[12px] lg:flex justify-end items-center space-x-[15px]">
              <span className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </span>
             

              <span
                onClick={() => {
                  router.push("/login");
                }}
                className="cursor-pointer">
                로그인
              </span>
            </div>
            <div className="lg:hidden lg:w-0  w-[33%] flex justify-end items-center">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-7 h-7">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
