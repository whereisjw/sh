"use client";
import React, { useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "../utils/client/fetcher";
import { Post, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import useCoords from "../utils/client/useCoords";
import LadingCommunityList from "./LadingCommunityList";
import useUser from "../utils/client/useUser";

interface WithUSer extends Post {
  user: User;
  _count: {
    Wondering: number;
    Answer: number;
  };
}

interface ISWR {
  ok: boolean;
  getPosts: WithUSer[];
}

const CommunityList = () => {
  const { latitude, longitude } = useCoords();
  const { data } = useSWR<ISWR>(
    `/api/posts?latitude=${latitude}&longitude=${longitude}`,
    fetcher
  );

  const { data: user, isLoading: userLoading } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (user && user.ok === false) {
      router.push("/login");
    }
  }, [user, router]);

  return (
    <>
      {!data && <LadingCommunityList />}
      {data?.getPosts?.map((post) => (
        <div
          key={post.id}
          onClick={() => router.push(`/community/${post.id}`)}
          className="flex cursor-pointer flex-col items-start "
        >
          <span className="flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100  text-gray-800">
            히포질문
          </span>
          <span className="mt-2 text-gray-700">
            <span className="text-teal-500 font-medium">Q.</span>{" "}
            {post?.question}
          </span>
          <div className="mt-5 flex items-center justify-between w-full text-gray-500 font-medium text-xs">
            <span>{post.user.name}</span>
            <span>{post?.createdAt?.toLocaleString().split("T")[0]}</span>
          </div>
          <div className="flex space-x-5 mt-3 text-gray-700 py-2.5 border-t border-b-[1.5px] w-full">
            <span className="flex space-x-2 items-center text-sm">
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>공감 {post._count.Wondering}</span>
            </span>
            <span className="flex space-x-2 items-center text-sm">
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
              <span>답변 {post._count.Answer}</span>
            </span>
          </div>
        </div>
      ))}
    </>
  );
};

export default CommunityList;
