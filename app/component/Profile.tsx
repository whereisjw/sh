"use client";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/link";
import React, { useEffect } from "react";
import useUser from "../utils/client/useUser";
import { Review, User } from "@prisma/client";
import { useRouter } from "next/navigation";

interface reviewWithUser extends Review {
  createBy: User;
  user: User;
}

interface IReviewResponse {
  ok: boolean;
  reviews: reviewWithUser[];
}

const Profile = () => {
  const { data: user, isLoading: userLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user && user.ok === false) {
      router.push("/login");
    }
  }, [user, router]);

  return (
    <>
      <div className="flex items-center space-x-3">
        {user?.profile?.avatar !== null ? (
          <img
            src={`https://imagedelivery.net/H9OXqClZlsbj60bAqD6qiw/${user?.profile?.avatar}/public`}
            className="w-16 h-16 bg-gray-500 rounded-full"
          />
        ) : (
          <Skeleton width={64} height={64} borderRadius={100} />
        )}

        <div className="flex flex-col lg:flex-row lg:items-center">
          <span className="font-medium text-gray-900 text-xl lg:text-2xl cursor-pointer">
            {user?.profile?.name}
            {!user?.profile?.name && <Skeleton width={100} />}
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
