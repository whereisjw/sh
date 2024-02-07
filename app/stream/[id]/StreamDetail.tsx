"use client";
import { fetcher } from "@/app/utils/client/fetcher";
import { Message, Stream, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";

import useSWR from "swr";

interface IParams {
  url: string;
}
interface StreamWithMessages extends Stream {
  Messages: Message;
  user: User;
}

interface SWRResponse {
  ok: true;
  stream: StreamWithMessages;
}

const StreamDetail = ({ url }: IParams) => {
  const router = useRouter();
  const { data } = useSWR<SWRResponse>(`/api/streams/${url}`, fetcher);

  return (
    <div className="flex flex-col">
      <h3 className="  text-gray-700 text-2xl   font-bold mt-2">
        {data?.stream.name}
      </h3>
      <h4>{data?.stream.price}</h4>
      <h6>{data?.stream.description}</h6>
    </div>
  );
};

export default StreamDetail;
