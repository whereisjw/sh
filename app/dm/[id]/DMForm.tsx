"use client";
import useMutation from "@/app/utils/client/useMutation";
import React from "react";
import { useForm } from "react-hook-form";

interface IForm {
  dm: string;
}

interface IProps {
  url: string;
}

const DMForm = ({ url }: IProps) => {
  const { handleSubmit, register } = useForm<IForm>();
  const [mutation, { loading, data, error }] = useMutation(`/api/dm/${url}`);
  const onValid = (data: IForm) => {
    mutation({
      dm: data.dm,
      url: url,
    });
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onValid)}
        className="flex mx-auto justify-center  items-center absolute bottom-[15vh] w-[80vw]"
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

export default DMForm;
