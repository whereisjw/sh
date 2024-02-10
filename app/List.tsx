"use client";
import React from "react";
import useUser from "./utils/client/useUser";
import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "./utils/client/fetcher";
import { Product } from "@prisma/client";

interface ProductWithCount extends Product {
  _count: { Like: number };
}

interface ISWR {
  ok?: boolean;
  products: ProductWithCount[];
}

const List = () => {
  const user = useUser();
  const { data } = useSWR<ISWR>("/api/products", fetcher);

  return (
    <>
      <div className="flex flex-col space-y-5 py-10">
        {data?.products?.map((product, index) => (
          <div
            key={index}
            className="flex justify-between border-b pb-4 cursor-pointer"
          >
            <div className="flex space-x-4">
              {product?.image && product?.image !== "1" ? (
                <img
                  src={`https://imagedelivery.net/H9OXqClZlsbj60bAqD6qiw/${product?.image}/public`}
                  className="w-20  h-20 bg-gray-400 rounded-md shadow-sm px-4"
                />
              ) : (
                <div className="w-20 h-20 bg-gray-400 rounded-md shadow-sm px-4" />
              )}
              <div className="pt-2 flex flex-col">
                <h3 className="text-sm font-medium text-gray-900">
                  <Link href={`/products/${product.id}`}> {product.name} </Link>
                </h3>
                <span className="text-xs text-gray-500">
                  {product.category}
                </span>
                <span className="font-medium mt-1 text-gray-900">
                  {product.price}원
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
                <span>{product._count.Like}</span>
              </div>
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
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  ></path>
                </svg>
                <span>1</span>
              </div>
            </div>
          </div>
        ))}
        <button className="fixed bottom-24 right-5 hover:bg-teal-500 cursor-pointer transition-colors bg-teal-400 rounded-full p-4 text-white shadow-xl">
          <Link href={`products/upload`}>
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </Link>
        </button>
      </div>
    </>
  );
};

export default List;
