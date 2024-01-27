import smtpTransport from "@/prisma/email";
import  prisma from "../../../../prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";



declare module "iron-session"{
    interface IronSessionData{
        user?:{
            id:number;
        }
        
    }
}

interface IResponse{
    ok?:boolean;
    [key:string]:any;
}


export default withIronSessionApiRoute( async function handler(req:NextApiRequest,res:NextApiResponse<IResponse>){
   
if(req.method === 'POST'){
 const {id}:any = req.query
const {user} = req.session

 const likeExist = await prisma.like.findFirst({
    where:{
        productId:+id,
        userId:user?.id,
    }
 })
console.log(likeExist,'1');

if(likeExist){
    await prisma.like.delete({
        where:{
            id:likeExist.id,
        }
    })
}else{
    await prisma.like.create({
      data:{
        user:{
            connect:{
                id:user?.id
            }
        },
        product:{
            connect:{
                id:+id
            }
        },
      }
    })
}//ifelse 

res.json({ok:true})
}//POST
},{
 cookieName:"shSession",
 password:"1354948945415616571651765156741675174657414765156489649949"   
})