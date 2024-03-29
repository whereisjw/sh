"use client";
import axios from "axios";
import React, { useEffect } from "react";

import { useForm } from "react-hook-form";
import useMutation from "../utils/client/useMutation";
import { useRouter } from "next/navigation";
import useUser from "../utils/client/useUser";

interface IForm {
  email?: string;
  phone: string;
}
interface TokenForm {
  token: string;
}
interface IData {
  ok: boolean;
}

const Enter = () => {
  const [enter, { loading, data, error }] = useMutation("api/users/login");
  const { data: user, isLoading: userLoading } = useUser();
  const [confirmToken, { loading: tokenLoading, data: TokenData }] =
    useMutation("api/users/confirm");
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const {
    register: tokenRegister,
    handleSubmit: tokenHandleSubmit,
    setValue: tokenSetValue,
  } = useForm<TokenForm>();
  const router = useRouter();
  const onTokenValid = (tokenValid: TokenForm) => {
    confirmToken(tokenValid);
    router.push("/");
  };

  const onValid = (formData: IForm) => {
    enter(formData);
    setValue("email", "");
  };
  useEffect(() => {
    if (user && user.ok) {
      router.push("/list");
    }
  }, [user, router]);

  useEffect(() => {
    if (TokenData && TokenData.ok) {
      router.push("/list");
    }
  }, [TokenData, router]);

  return (
    <div className="fixed top-[50%]  translate-y-[-50%] border border-teal-500 rounded-md shadow-md py-4 px-8">
      {data?.ok ? (
        <form
          onSubmit={tokenHandleSubmit(onTokenValid)}
          action=""
          className="flex flex-col items-center space-y-4"
        >
          <legend className="font-bold text-2xl text-teal-500 hover:text-teal-600">
            인증번호입력
          </legend>
          {tokenLoading ? (
            <span className="text-sm text-gray-400">
              로그인 처리중입니다. 잠시만 기다려주세요.
            </span>
          ) : (
            <input
              className="border focus:ring focus:ring-teal-500 focus:border-none focus:outline-none rounded-md shadow-sm py-2 px-4 placeholder:text-sm"
              type="text"
              placeholder="이메일로 받은 인증번호를 입력"
              {...tokenRegister("token", { required: true })}
            />
          )}

          <button className="bg-teal-500 rounded-md py-2 px-4 text-white font-semibold shadow-sm hover:bg-teal-600 focus:ring focus:ring-teal-500   ">
            {tokenLoading ? "로그인중..." : "로그인하기"}
          </button>
        </form>
      ) : (
        <form
          onSubmit={handleSubmit(onValid)}
          action=""
          className="flex flex-col items-center space-y-4"
        >
          <legend className="font-bold text-2xl text-teal-500 hover:text-teal-600">
            로그인
          </legend>

          {loading ? (
            <span className="text-sm text-gray-400">
              메일 전송중입니다. 최대 1분까지 소요됩니다. 잠시만 기다려주세요
            </span>
          ) : (
            <input
              className="border focus:ring focus:ring-teal-500 focus:border-none focus:outline-none rounded-md shadow-sm py-2 px-4"
              type="text"
              placeholder="이메일을입력하세요"
              {...register("email", { required: true })}
            />
          )}

          <button className="bg-teal-500 rounded-md py-2 px-4 text-white font-semibold shadow-sm hover:bg-teal-600 focus:ring focus:ring-teal-500   ">
            {loading ? "메일전송중.." : "인증번호 전송"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Enter;
