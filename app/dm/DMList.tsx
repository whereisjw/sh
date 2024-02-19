"use client";
import React, { useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "../utils/client/fetcher";
import { DM, DMRoom, User } from "@prisma/client";
import Link from "next/link";
import useUser from "../utils/client/useUser";
import DMLoading from "./DMLoading";
import { useRouter } from "next/navigation";

interface DMWithUser extends DM {
  user: User;
}

interface DMRoomWitBuyerSeller extends DMRoom {
  seller: User;
  buyer: User;
  DM: DMWithUser[];
}

interface SWRResponse {
  myDmList: DMRoomWitBuyerSeller[];
  myEmail: string;
  ok: true;
}
const DMList = () => {
  const { data } = useSWR<SWRResponse>(`/api/dm`, fetcher);
  const { data: user, isLoading: userLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user && user.ok === false) {
      router.push("/login");
    }
  }, [user, router]);
  return (
    <div className="flex flex-col space-y-5 py-10">
      {!data && <DMLoading />}
      {data?.myDmList?.map((value, index) => (
        <Link key={value.id} href={`/dm/${value.id}`} className="flex">
          {user?.profile?.id === value.buyerId && value.seller.avatar && (
            <img
              src={`https://imagedelivery.net/H9OXqClZlsbj60bAqD6qiw/${value.seller.avatar}/public`}
              className="w-20 h-20 bg-gray-500 rounded-full"
            />
          )}
          {user?.profile?.id === value.sellerId && value.buyer.avatar && (
            <img
              src={`https://imagedelivery.net/H9OXqClZlsbj60bAqD6qiw/${value.buyer.avatar}/public`}
              className="w-20 h-20 bg-gray-500 rounded-full"
            />
          )}

          {user?.profile?.id === value.sellerId && !value.buyer.avatar && (
            <div className="w-20 h-20 bg-gray-500 rounded-full" />
          )}

          {user?.profile?.id === value.buyerId && !value.seller.avatar && (
            <div className="w-20 h-20 bg-gray-500 rounded-full" />
          )}

          <div className="pl-3  w-full">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold md:text-lg">
                {user?.profile?.id === value.buyerId && value.seller.name}
                {user?.profile?.id === value.sellerId && value.buyer.name}
              </span>
              <span className="text-xs text-slate-400">
                {value?.DM[0]?.updatedAt.toLocaleString().split("T")[0]}
              </span>
            </div>
            {value?.DM[0]?.dm ? (
              <div className="text-sm">{value?.DM[0]?.dm}</div>
            ) : (
              <div className="text-sm">대화를 시작해주세요</div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default DMList;
