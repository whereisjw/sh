"use client";
import React from "react";
import { useForm } from "react-hook-form";
import useMutation from "../utils/client/useMutation";
interface MessageForm {
  message: string;
}
interface Props {
  url: string;
}
const Stream_Form = ({ url }: Props) => {
  const [mutation, { loading, data, error }] = useMutation(
    `/api/streams/${url}/messages`
  );
  const { register, handleSubmit, setValue } = useForm<MessageForm>();
  const onValid = (messageData: MessageForm) => {
    setValue("message", "");
    mutation(messageData);
  };
  return (
    <>
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
        {/*     <div className="absolute h-full inset-y-0 bottom-2 flex py-1.5 pr-1.5 right-0">
          <span className="flex h-full focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 items-center bg-teal-500 rounded-full px-3  hover:bg-teal-700 cursor-pointer text-sm text-white">
            &rarr;
          </span>
        </div> */}
        <div className="hidden">
          <button></button>
        </div>
      </form>
    </>
  );
};

export default Stream_Form;
