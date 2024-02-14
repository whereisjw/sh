"use client";
import React, { useEffect, useState } from "react";

import useSWR from "swr";
import { fetcher } from "@/app/utils/client/fetcher";
import { DM, DMRoom, User } from "@prisma/client";
import { useForm } from "react-hook-form";
import useMutation from "@/app/utils/client/useMutation";
import useUser from "@/app/utils/client/useUser";
interface IProps {
  params: {
    id: string;
  };
}
interface IForm {
  dm: string;
}

interface DMRoomWITHSellerBuyer extends DMRoom {
  seller: User;
  buyer: User;
}

interface DMWithUser extends DM {
  user: User;
}

interface ISWR {
  ok: boolean;
  dms: DMWithUser[];
}
const page = ({ params }: IProps) => {
  const { data, mutate } = useSWR<ISWR>(`/api/dm/${params.id}`, fetcher);

  const { handleSubmit, register, reset } = useForm<IForm>();
  const [mutation, { data: mutationData }] = useMutation(
    `/api/dm/${params.id}`
  );
  const onValid = (data: IForm) => {
    mutation({
      dm: data.dm,
      url: params.id,
    });
    reset();
  };
  const { data: user, isLoading: userLoading } = useUser();
  useEffect(() => {
    if (mutationData && mutationData.ok) {
      mutate();
    }
  }, [onValid, mutationData]);
  return (
    <>
      {/*    src={`https://imagedelivery.net/H9OXqClZlsbj60bAqD6qiw/${user?.profile?.avatar}/public`} */}
      <div className="pt-10  space-y-3  pb-[10vh]">
        {data?.dms?.map((v) => (
          <>
            {!userLoading && v.userId === user.profile.id ? (
              <div className="flex items-center justify-end space-x-2">
                <div className="w-1/2 text-sm text-gray-700 p-2 border  border-gray-600 rounded-md">
                  {v.dm}
                </div>
                {v.user.avatar ? (
                  <img
                    src={`https://imagedelivery.net/H9OXqClZlsbj60bAqD6qiw/${v.user.avatar}/public`}
                    className="w-8 h-8 bg-gray-500 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-400" />
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                {v.user.avatar ? (
                  <img
                    src={`https://imagedelivery.net/H9OXqClZlsbj60bAqD6qiw/${v.user.avatar}/public`}
                    className="w-8 h-8 bg-gray-500 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-400" />
                )}
                <div className="w-1/2 text-sm text-gray-700 p-2 border  border-gray-600 rounded-md">
                  {v.dm}
                </div>
              </div>
            )}
          </>
        ))}
        {/* map */}
      </div>

      <form
        onSubmit={handleSubmit(onValid)}
        className="flex mx-auto justify-center  items-center fixed bottom-[15vh] w-[80vw]"
      >
        <input
          {...register("dm")}
          type="text"
          placeholder="채팅을 입력해주세요"
          className="shadow-md rounded-full border border-r-0 pl-5 py-2 w-full border-gray-300 pr-12 focus:ring-teal-500 focus:border-teal-500 focus:outline-none"
        />
        <div className="hidden">
          <button></button>
        </div>
      </form>
    </>
  );
};

export default page;
