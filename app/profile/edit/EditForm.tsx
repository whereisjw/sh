"use client";
import useUser from "@/app/utils/client/useUser";
import { User } from "@prisma/client";
import React from "react";
import { useForm } from "react-hook-form";

interface IEdit {
  email: string;
  name: string;
}
/* interface IResponse {
  ok: boolean;
  profile: User;
} */

const EditForm = () => {
  const user = useUser();
  const { handleSubmit, setValue, register } = useForm<IEdit>();

  const onEditValid = (ValidData: IEdit) => {
    console.log(ValidData);
    setValue("email", "");
    setValue("name", "");
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onEditValid)}
        className="py-10 px-4 space-y-4"
      >
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 rounded-full bg-gray-500 " />
          <label
            htmlFor="photo"
            className="cursor-pointer py-2 px-3 border-gray-300 rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Change Photo
            <input id="photo" type="file" accept="image/*" className="hidden" />
          </label>
        </div>
        <div className="space-y-1">
          <div className="text-sm font-medium text-gray-500">Email address</div>
          <input
            type="email"
            defaultValue={user?.profile.email}
            {...register("email")}
            className="px-4 appearance-none w-full py-2 border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500 "
          />
        </div>
        <div className="space-y-1">
          <div className="text-sm font-medium text-gray-500">닉네임</div>
          <div className="flex rounded-md shadow-sm">
            <input
              {...register("name")}
              className="px-4 appearance-none w-full py-2 border-gray-300 rounded-md rounded-l-none shadow-sm placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              type="text"
            />
          </div>
        </div>
        <button className="mt-6 w-full bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 focus:outline-none">
          프로필 업데이트
        </button>
      </form>
    </>
  );
};

export default EditForm;
