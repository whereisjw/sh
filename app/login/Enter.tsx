'use client'
import axios from 'axios';
import React from 'react'
 
import { useForm } from 'react-hook-form';
import useMutation from '../utils/client/useMutation';


interface IForm{
    email?:string;
    phone:string;
}

const Enter = () => {
    const [enter,{loading,data,error}] = useMutation('api/users/login')
    const {register,handleSubmit} = useForm<IForm>()
const onValid = (formData:IForm)=> {
enter(formData)
}

 


  return (
    <div className='fixed top-[50%]  translate-y-[-50%] border border-teal-500 rounded-md shadow-md py-4 px-8'>
        <form onSubmit={handleSubmit(onValid)} action="" className='flex flex-col items-center space-y-4'>
            <legend className='font-bold text-2xl text-teal-500 hover:text-teal-600'>로그인</legend>
            <input className='border focus:ring focus:ring-teal-500 focus:border-none focus:outline-none rounded-md shadow-sm py-2 px-4' type="text" placeholder='이메일을입력하세요' {...register('email',{required:true})} />
            <button className='bg-teal-500 rounded-md py-2 px-4 text-white font-semibold shadow-sm hover:bg-teal-600 focus:ring focus:ring-teal-500   '>로그인하기</button>
        </form>
    </div>
  )
}

export default Enter