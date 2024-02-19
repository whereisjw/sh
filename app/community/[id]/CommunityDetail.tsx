"use client";

import { fetcher } from "@/app/utils/client/fetcher";
import useMutation from "@/app/utils/client/useMutation";
import { Answer, Post, User } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";

interface AnswerWithUser extends Answer {
  user: User;
}

interface IPostWithUser extends Post {
  user: User;
  Answer: AnswerWithUser[];
  _count: {
    Answer: number;
    Wondering: number;
  };
}

interface IResponse {
  ok: boolean;
  post: IPostWithUser;
  isWondering: boolean;
}

interface ICommunityAnswer {
  answer: string;
}

interface IParams {
  params: { id: string };
}

interface IAnswerResponse {
  ok: boolean;
  answer: Answer;
}

const CommunityDetail = ({ params }: IParams) => {
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm<ICommunityAnswer>();
  const { data, mutate, isLoading } = useSWR<IResponse>(
    params.id ? `/api/posts/${params.id}` : null,
    fetcher
  );
  const [wonderMutation, { loading, data: wonderData, error }] = useMutation(
    `/api/posts/${params.id}/wonder`
  );
  const [
    answerMutation,
    { loading: answerLoading, data: answerData, error: answerError },
  ] = useMutation(`/api/posts/${params.id}/answers`);
  const onWonderClick = () => {
    if (!data) return false;
    mutate(
      {
        ...data,
        isWondering: !data.isWondering,
        post: {
          ...data.post,
          _count: {
            ...data.post._count,
            Wondering: data.isWondering
              ? data?.post._count.Wondering - 1
              : data?.post._count.Wondering + 1,
          },
        },
      },
      false
    );
    wonderMutation({});
  };
  const onAnswerValid = (onAnswerValid: ICommunityAnswer) => {
    answerMutation(onAnswerValid);
    setValue("answer", "");
  };
  useEffect(() => {
    mutate();
  }, [onAnswerValid]);

  return (
    <div>
      <span className="inline-flex items-center my-2 mx-4 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100  text-gray-800">
        히포질문
      </span>
      <div className="flex mb-3 cursor-pointer p-3 border-b  items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-gray-300" />
        <div>
          <p className="text-sm font-medium text-gray-700">
            {data?.post?.user?.name}
          </p>
          <p className="text-xs font-medium text-gray-500">
            <Link href={`users/profiles/${data?.post?.user?.id}`}>
              View profile &rarr;
            </Link>
          </p>
        </div>
      </div>
      <div></div>
      <div>
        <div />
      </div>
      <div>
        <div className="px-4">
          <span>Q.</span> {data?.post?.question}
          <div className="flex space-x-5 mt-3 text-gray-700 py-2.5 border-t border-b-[1.5px] w-full">
            <span
              onClick={onWonderClick}
              className="cursor-pointer flex space-x-2 items-center text-sm"
            >
              <svg
                className={
                  data?.isWondering ? "w-4 h-4 fill-teal-500" : "w-4 h-4"
                }
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
              <span>공감 {data?.post?._count.Wondering}</span>
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
              <span>답변 {data?.post?._count?.Answer}</span>
            </span>
          </div>
        </div>
      </div>
      <div className="px-4 my-5 space-y-5">
        <div>
          <div />
          {data &&
            data?.post.Answer.map((v) => (
              <div key={v.id} className="flex   items-start space-x-3">
                <span
                  key={v.id}
                  className="w-8 h-8 bg-gray-200 rounded-full text-sm font-medium text-gray-500"
                ></span>
                <span>{v.user.name}</span>
                <span className="text-sm text-gray-400">
                  {v.createdAt.toLocaleString().split("T")[0]}
                </span>
                <p className="text-gray-700">{v.answer}</p>
              </div>
            ))}
        </div>
      </div>
      <form className="px-4" onSubmit={handleSubmit(onAnswerValid)}>
        <textarea
          {...register("answer", { required: true, minLength: 5 })}
          placeholder="질문의 답변을 입력해주세요(최소 5자이상)"
          className="resize-none mt-1 shadow-sm w-full focus:ring-2 focus:ring-teal-500 rounded-md border-gray-400 focus:border-teal-500"
          rows={4}
        />
        <button className="mt-4 w-full bg-teal-500 py-4 hover:bg-teal-600 hover:text-white rounded-md">
          {answerLoading ? "로딩중..." : "답변하기"}
        </button>
      </form>
    </div>
  );
};

export default CommunityDetail;
