"use client";
import { motion } from "framer-motion";
import Link, { useRouter } from "next/navigation";
import React from "react";

const Header = () => {
  const router = useRouter();
  return (
    <>
      <div className="mt-[15vh] ">
        <div className=" z-10 bg-white w-full h-[15vh] border-b border-gray-300 fixed top-0">
          <div className="h-[6vh]   flex items-center justify-center bg-teal-500 text-white">
            <div className="text-center text-[12px] flex justify-center items-center font-medium">
              <span>중고홈짐의 메카 하마핏마켓에 오신걸 환영합니다.</span>
            </div>
          </div>
          <div className="flex w-full justify-between items-center h-[9vh]   py-4 px-8">
            <div className="lg:block hidden w-[33%] text-[12px] space-x-[15px] font-medium">
              <span className="cursor-pointer">
              <motion.svg xmlns="http://www.w3.org/2000/svg" width='50' height='50' viewBox="0 0 640 512">
                <path fill="#63E6BE" d="M407 47c9.4-9.4 24.6-9.4 33.9 0l17.2 17.2c1.9-.1 3.9-.2 5.8-.2h32c11.2 0 21.9 2.3 31.6 6.5L543 55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9L564 101.9c7.6 12.2 12 26.7 12 42.1c0 10.2 7.4 18.8 16.7 23c27.9 12.5 47.3 40.5 47.3 73c0 26.2-12.6 49.4-32 64v32c0 8.8-7.2 16-16 16H560c-8.8 0-16-7.2-16-16V320H480v16c0 8.8-7.2 16-16 16H432c-8.8 0-16-7.2-16-16V318.4c-11.8-2.4-22.7-7.4-32-14.4c-1.5-1.1-2.9-2.3-4.3-3.5c-17-14.7-27.7-36.4-27.7-60.5c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 44.7 26.2 83.2 64 101.2V352c0 17.7 14.3 32 32 32h32v64c0 17.7-14.3 32-32 32H352c-17.7 0-32-14.3-32-32V372c-19.8 7.7-41.4 12-64 12s-44.2-4.3-64-12v76c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V329.1L45.9 369.7c-5.4 12.1-19.6 17.6-31.7 12.2S-3.3 362.4 2.1 350.3L24 300.9c5.3-11.9 8-24.7 8-37.7C32 155.7 117.2 68 223.8 64.1l.2-.1h7.2H256h32c41.7 0 83.4 12.1 117.2 25.7c1.7-1.8 3.5-3.6 5.3-5.2L407 81c-9.4-9.4-9.4-24.6 0-33.9zm73 185a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zm88 24a24 24 0 1 0 0-48 24 24 0 1 0 0 48zM480 144a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zm48 16a16 16 0 1 0 0-32 16 16 0 1 0 0 32z"/>
              </motion.svg>
              </span>
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
            <img src="" alt="" />
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
