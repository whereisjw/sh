"use client";
import Link from "next/link";
import React from "react";
import useUser from "../utils/client/useUser";
import useSWR from "swr";
import { fetcher } from "../utils/client/fetcher";
import { Review, User } from "@prisma/client";

interface reviewWithUser extends Review {
  createBy: User;
  user: User;
}

interface IReviewResponse {
  ok: boolean;
  reviews: reviewWithUser[];
}

const Profile = () => {
  const user = useUser();

  return (
    <>
      <div className="flex items-center space-x-3">
        <div className="w-16 h-16 bg-gray-500 rounded-full" />
        <div className="flex flex-col lg:flex-row lg:items-center">
          <span className="font-medium text-gray-900 text-xl lg:text-2xl cursor-pointer">
            {user?.profile?.name}
          </span>
          <Link
            href={"/profile/edit"}
            className="border px-2 py-2 m-2 shadow-sm rounded-md lg:text-sm text-xs text-gray-700"
          >
            프로필 변경하기 &rarr;
          </Link>
        </div>
      </div>
    </>
  );
};

export default Profile;
