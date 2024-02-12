"use client";
import React from "react";
import useSWR from "swr";
import { fetcher } from "../utils/client/fetcher";
import { Product, Sale } from "@prisma/client";

interface productWithCount extends Product {
  _count: {
    like: number;
  };
}

interface saleWithProduct extends Sale {
  product: productWithCount;
}

interface RESPONSE {
  ok: boolean;
  sale: saleWithProduct[];
}

const Profile_upload = () => {
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
      <div className="bg-gray-500  border shadow-md rounded-lg px-4 py-8 my-5 text-sm lg:text-base">
        <ul>
          <li className="hover:text-white border border-b-0  border-gray-400 py-2 px-1 text-gray-400 text-sm font-bold ">
            판매 내역
          </li>
          <li className="hover:text-white border border-b-0  border-gray-400 py-2 px-1 text-gray-400 text-sm font-bold ">
            구매 내역
          </li>
          <li className="hover:text-white border border-b-0  border-gray-400 py-2 px-1 text-gray-400 text-sm font-bold ">
            찜목록
          </li>
          <li className="group cursor-pointer border border-gray-400 py-2 px-1 text-red-400 text-sm font-bold flex items-center space-x-2 hover:text-red-500">
            <svg
              className="text-sm w-5 h-5 fill-red-400 group-hover:fill-red-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" />
            </svg>
            <span className="group-hover:text-red-500"> 로그아웃</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Profile_upload;
