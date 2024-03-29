"use client";
import { fetcher } from "@/app/utils/client/fetcher";
import { Product, Sale } from "@prisma/client";
import React from "react";
import useSWR from "swr";
interface ProductWithCount extends Product {
  _count: {
    Like: number;
  };
}

interface SaleWithProduct extends Sale {
  product: ProductWithCount;
}

interface ISWRResponse {
  ok: boolean;
  sale: SaleWithProduct[];
}

const Sold = () => {
  const { data } = useSWR<ISWRResponse>(`/api/users/me/sales`, fetcher);

  return (
    <div className="grid grid-cols-1 gap-3   lg:grid-cols-2   py-10">
      {data?.sale?.map((value) => (
        <div key={value.id} className="col-span-1">
          <div className="h-56 w-full bg-gray-300" />
          <h3 className="text-sm text-gray-700">{value.product.name}</h3>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">
              ₩{value.product.price}
            </span>
            <div className="flex items-center space-x-1">
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
              <span>{value.product._count.Like}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sold;
