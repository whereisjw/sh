"use client";
import { Stream } from "@prisma/client";
import React, { useEffect, useState } from "react";

import useSWR from "swr";
import { fetcher } from "../utils/client/fetcher";
import Link from "next/link";

interface SWRResponse {
  ok: boolean;
  stream: Stream[];
}

const StreamList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useSWR<SWRResponse>(
    `/api/streams?page=${currentPage}`,
    fetcher
  );

  const handleCurrentPageClick = (set: string) => {
    set === "plus" ? setCurrentPage((prev) => prev + 1) : null;
    set === "minus" ? setCurrentPage((prev) => prev - 1) : null;
  };

  return (
    <>
      {data?.stream.map((v) => (
        <Link href={`/stream/${v.id}`} className="pt-4 px-4" key={v.id}>
          <div className="w-full rounded-md shadow-sm bg-gray-300 aspect-video" />
          <h3 className="  text-gray-700 text-lg mt-2">{v.name}</h3>
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
        <li>{currentPage}</li>
        <li>
          <button
            onClick={() => handleCurrentPageClick("plus")}
            type="button"
            className="bg-teal-500 rounded-xl px-2 py-1"
          >
            다음
          </button>
        </li>
      </ul>
    </>
  );
};

export default StreamList;
