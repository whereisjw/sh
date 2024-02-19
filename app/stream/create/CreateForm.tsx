"use client";
import useMutation from "@/app/utils/client/useMutation";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Stream } from "stream";

interface IForm {
  name: string;
  price: string;
  description: string;
}

const CreateForm = () => {
  const router = useRouter();
  const [liveMutation, { loading, data: liveData, error }] =
    useMutation(`/api/streams`);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = (data: IForm) => {
    if (loading) return false;
    liveMutation(data);
  };

  useEffect(() => {
    if (liveData?.ok) {
      router.push(`/stream/${liveData?.stream?.id}`);
    }
  }, [liveData, router]);
  return (
    <form onSubmit={handleSubmit(onValid)} className="px-4 py-16 ">
      <div className="my-5">
        <span className="mb-1 block text-sm font-medium text-gray-500">
          name
        </span>
        <div className="rounded-md flex items-center relative shadow-sm">
          <div className="absolute left-0 pl-3 flex items-center justify-center pointer-events-none">
            <span className="text-gray-500 text-sm">₩</span>
          </div>
          <input
            {...register("name", { required: true })}
            className="appearance-none pl-7  w-full py-2 border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500 "
            type="text"
            placeholder="0.00"
          />
          <div className="absolute right-0 pr-3 flex items-center pointer-events-none">
            <span className=" text-gray-500">USD</span>
          </div>
        </div>
      </div>
      <div className="my-5">
        <span className="mb-1 block text-sm font-medium text-gray-500">
          Price
        </span>
        <div className="rounded-md flex items-center relative shadow-sm">
          <div className="absolute left-0 pl-3 flex items-center justify-center pointer-events-none">
            <span className="text-gray-500 text-sm">₩</span>
          </div>
          <input
            {...register("price", { required: true, valueAsNumber: true })}
            className="appearance-none pl-7  w-full py-2 border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500 "
            type="number"
            placeholder="0.00"
          />
          <div className="absolute right-0 pr-3 flex items-center pointer-events-none">
            <span className=" text-gray-500">USD</span>
          </div>
        </div>
      </div>
      <div>
        <span className="mb-1 block text-sm font-medium text-gray-500">
          Description
        </span>
        <div>
          <textarea
            {...register("description", { required: true })}
            className="resize-none mt-1 shadow-sm w-full focus:ring-2 focus:ring-teal-500 rounded-md border-gray-400 focus:border-teal-500"
            rows={4}
          />
        </div>
      </div>
      <button className="mt-4 w-full bg-teal-500 py-4 hover:bg-teal-600 hover:text-white rounded-md">
        {loading ? "로딩중" : " go live"}
      </button>
    </form>
  );
};

export default CreateForm;
