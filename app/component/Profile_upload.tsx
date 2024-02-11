"use client";
import React from "react";
import useSWR from "swr";
import { fetcher } from "../utils/client/fetcher";

const Profile_upload = () => {
  const { data } = useSWR(`/api/sales`, fetcher);
  return (
    <>
      <div className="bg-gray-500  border shadow-md rounded-lg px-4 py-8 my-5 text-sm lg:text-base">
        <p className="text-white font-semibold mb-3">내 중고홈짐</p>
        <div className="border border-gray-400 p-2 flex flex-col items-center text-white font-medium">
          <span>사용하지 않는 중고 홈짐을 등록하고</span>
          <span>나눔을 실천해요!</span>
          <button className="py-3 px-1 border-2 rounded-md w-full text-center my-3 cursor-pointer hover:bg-teal-500   text-lg lg:text-xl focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 focus:border-0 focus:outline-none">
            중고홈짐 등록하기
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile_upload;
