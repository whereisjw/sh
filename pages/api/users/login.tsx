import  prisma from "../../../prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {email} = req.body
 /*    let user */
if(req.method === 'POST'){
  const  user = await prisma.user.upsert({
        where:{
            email:email
        },//찾아라
        create:{
            email:email,
            name:'기본이름',
        },//없으면 만들어라
        update:{},// 있으면 업데이트해라
    })
   /*   user = await prisma.user.findUnique({
        where:{
            email:email,
        }
    })
    if(!user){
        console.log('없는 유저임 회원가입을 진행하겠음');
        await prisma.user.create({
            data:{
                name:"기본이름",
                email:email,
            }
        })
    }
    console.log(user);
   
}//post
    res.status(200).json({ok:true})
}