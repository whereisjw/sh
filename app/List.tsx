"use client";
import React, { useEffect, useState } from "react";
import useUser from "./utils/client/useUser";
import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "./utils/client/fetcher";
import { Product } from "@prisma/client";
import Loading from "./Loading";
import { useRouter } from "next/navigation";

interface ProductWithCount extends Product {
  _count: { Like: number };
}

interface ISWR {
  ok?: boolean;
  length: number;
  products: ProductWithCount[];
}

const List = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(false);
  const handleCurrentPageClick = (set: string) => {
    set === "plus" ? setCurrentPage((prev) => prev + 1) : null;
    if (set === "minus") {
      setCurrentPage((prev) => prev - 1);
      setLastPage(false);
    }
  };
  const { data: user, isLoading: userLoading } = useUser();
  const router = useRouter();

  const { data } = useSWR<ISWR>(`/api/products?page=${currentPage}`, fetcher);
  useEffect(() => {
    if (data && data.length < 4) {
      setLastPage(true);
    }
    if (data && data.length === 0) {
      setLastPage(true);
      setCurrentPage((prev) => prev - 1);
    }
  }, [currentPage, data]);
  useEffect(() => {
    if (user && user.ok === false) {
      router.push("/login");
    }
  }, [user, router]);

  return (
    <>
      <div className="flex flex-col space-y-5 py-10">
        {!data && (
          <>
            <Loading />
          </>
        )}
        {data?.products?.map((product, index) => (
          <Link
            href={`/products/${product.id}`}
            key={index}
            className="flex justify-between border-b pb-4 cursor-pointer"
          >
            <div className="flex space-x-4">
              {product?.image && product?.image !== "1" ? (
                <img
                  src={`https://imagedelivery.net/H9OXqClZlsbj60bAqD6qiw/${product?.image}/public`}
                  className="w-20  h-20 bg-white rounded-md shadow-sm px-4"
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
                  {Number(product.price).toLocaleString()}원
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
            </div>
          </Link>
        ))}
        <ul className="flex items-center space-x-2 justify-center">
          <li>
            <button
              onClick={() => handleCurrentPageClick("minus")}
              type="button"
              disabled={currentPage === 1}
              className={
                currentPage === 1
                  ? `bg-gray-500 rounded-xl px-2 py-1`
                  : `bg-teal-500 rounded-xl px-2 py-1`
              }
            >
              이전
            </button>
          </li>
          <li>page : {currentPage}</li>
          <li>
            <button
              disabled={lastPage}
              onClick={() => handleCurrentPageClick("plus")}
              type="button"
              className={
                lastPage
                  ? `bg-gray-500 rounded-xl px-2 py-1`
                  : `bg-teal-500 rounded-xl px-2 py-1`
              }
            >
              다음
            </button>
          </li>
        </ul>
        <Link
          href={`products/upload`}
          className="fixed bottom-24 right-5 hover:bg-teal-500 cursor-pointer transition-colors bg-teal-400 rounded-full p-4 text-white shadow-xl"
        >
          {/*           <Link href={`products/upload`}> */}
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
      </div>
    </>
  );
};

export default List;
