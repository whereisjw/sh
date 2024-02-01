'use client'
import useCoords from '@/app/utils/client/useCoords'
import useMutation from '@/app/utils/client/useMutation'
import { Post } from '@prisma/client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

interface IFrom{
    question:string
}
interface IResponse{
    ok:boolean;
    post:Post;
}
const WriteForm = () => {
    const router = useRouter()
    const {latitude,longitude} = useCoords()
    const {register,handleSubmit,setValue} = useForm<IFrom>()
    const [mutation,{loading,data,error}] = useMutation(`/api/posts`)

    const onWriteValid = (validData:IFrom)=>{
        mutation({...validData,latitude,longitude})
    }
    useEffect(()=>{
        if(data&&data.ok) {
router.push('/community')
        }
    },[data,router])
  return (
    <div>    
        <form onSubmit={handleSubmit(onWriteValid)} className="px-4 py-10">
    <textarea
    {...register("question",{required:true,minLength:5})}
      placeholder="질문의 답변을 입력해주세요(최소 5자 이상 작성해주세요)"
      className="resize-none mt-1 shadow-sm w-full focus:ring-2 focus:ring-teal-500 rounded-md border-gray-400 focus:border-teal-500"
      rows={4}
    />
    <button className="mt-4 w-full bg-teal-500 py-4 hover:bg-teal-600 hover:text-white rounded-md">
      {loading ? '로딩중...' : '글쓰기'}
    </button>
  </form></div>
  )
}

export default WriteForm