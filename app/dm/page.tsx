"use client";
import React from "react";
import useSWR from "swr";
import { fetcher } from "../utils/client/fetcher";
import { DM, DMRoom, User } from "@prisma/client";
import Link from "next/link";
import useUser from "../utils/client/useUser";

interface DMRoomWitBuyerSeller extends DMRoom {
  seller: User;
  buyer: User;
}

interface SWRResponse {
  myDmList: DMRoomWitBuyerSeller[];
  myEmail: string;
  ok: true;
}
const page = () => {
  const { data } = useSWR<SWRResponse>(`/api/dm`, fetcher);
  const { data: user } = useUser();
  console.log(data);
  console.log(user);

  return (
    <div className="flex flex-col space-y-5 py-10">
      {data?.myDmList?.map((value, index) => (
        <Link href={`/dm/${value.id}`} className="flex">
          <div className="w-20 h-20 bg-gray-400 rounded-full shadow-sm px-4" />
          <div className="pl-3  w-full">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold md:text-lg">
                {user?.profile?.id === value.buyerId && value.seller.name}
                {user?.profile?.id === value.sellerId && value.buyer.name}
              </span>
              <span className="text-xs text-slate-400">
                {value.updatedAt.toLocaleString()}
              </span>
            </div>
            <div className="text-sm">메세지를 확인해주세요</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default page;
