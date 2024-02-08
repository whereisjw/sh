"use client";
import { Stream } from "@prisma/client";
import React from "react";

import useSWR from "swr";
import { fetcher } from "../utils/client/fetcher";
import Link from "next/link";

interface SWRResponse {
  ok: boolean;
  stream: Stream[];
}

const StreamList = () => {
  const { data } = useSWR<SWRResponse>(`/api/streams?page=1`, fetcher);

  return (
    <>
      {data?.stream.map((v) => (
        <Link href={`/stream/${v.id}`} className="pt-4 px-4" key={v.id}>
          <div className="w-full rounded-md shadow-sm bg-gray-300 aspect-video" />
          <h3 className="  text-gray-700 text-lg mt-2">{v.name}</h3>
        </Link>
      ))}
    </>
  );
};

export default StreamList;
