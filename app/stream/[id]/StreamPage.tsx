"use client";
import React, { useEffect } from "react";
import StreamDetail from "./StreamDetail";
import Stream_Message from "@/app/component/Stream_Message";
import Stream_Form from "@/app/component/Stream_Form";
import { fetcher } from "@/app/utils/client/fetcher";
import useSWR from "swr";
import { Message, Stream, User } from "@prisma/client";
import useUser from "@/app/utils/client/useUser";
import useMutation from "@/app/utils/client/useMutation";
import { useForm } from "react-hook-form";

interface IParams {
  params: { id: string };
}
interface StreamWithMessages extends Stream {
  Message: Message[];
  user: User;
}
interface MessageForm {
  message: string;
}
interface SWRResponse {
  ok: true;
  stream: StreamWithMessages;
}
const StreamPage = ({ params }: IParams) => {
  const { data: user, isLoading: userLoading } = useUser();
  const { data, mutate } = useSWR<SWRResponse>(
    `/api/streams/${params.id}`,
    fetcher,
    {
      refreshInterval: 1000,
    }
  );
  const [mutation, { loading, data: messageData, error }] = useMutation(
    `/api/streams/${params.id}/messages`
  );
  const { register, handleSubmit, setValue } = useForm<MessageForm>();
  const onValid = (messageData: MessageForm) => {
    setValue("message", "");
    /*     mutate(prev=>prev&&({...prev,stream:{...prev.stream:{...prev.stream,mesaage:[...prev.stream.messages,{id:Date.now(),message:messageData.message,user:{
      ...user:{
        ...user,
      }
    }}]}})) */
    mutation(messageData);
  };
  useEffect(() => {
    if (messageData && messageData.ok) {
      mutate();
    }
  }, [messageData]);

  return (
    <div className="py-10  px-4 space-y-4">
      <div className="w-full rounded-md shadow-sm bg-gray-300 aspect-video" />

      <StreamDetail url={params.id} />

      <div className="py-10 pb-16 h-[50vh] overflow-y-scroll px-4 space-y-6">
        {data?.stream.Message.map((v) => (
          <Stream_Message
            key={v.id}
            message={v.message}
            reverse={v.userId === user?.profile?.id ? "me" : "other"}
          />
        ))}
      </div>
      <form
        onSubmit={handleSubmit(onValid)}
        className="flex relative items-center"
      >
        <input
          {...register("message")}
          type="text"
          placeholder="채팅을 입력해주세요"
          className="shadow-md rounded-full border border-r-0 pl-5 py-2 w-full border-gray-300 pr-12 focus:ring-teal-500 focus:border-teal-500 focus:outline-none"
        />

        <div className="hidden">
          <button></button>
        </div>
      </form>
      <div className="fixed w-full mx-auto max-w-md bottom-0 left-0 right-0 inset-x-0"></div>
    </div>
  );
};

export default StreamPage;
