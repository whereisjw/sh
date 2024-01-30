import  prisma from "../../prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { Post } from "@prisma/client";


interface IResponse{
    ok:boolean;
    post:Post
}

export default withIronSessionApiRoute( async function handler(req:NextApiRequest,res:NextApiResponse<IResponse>){
   
if(req.method === 'POST'){
const {question} = req.body
const {user} = req.session

const post = await prisma.post.create({
    data:{
        question,
        user:{
            connect:{
                id:user?.id
            }
        }
    }
})

res.json({
    ok:true,post
})
}//POST
},{
 cookieName:"shSession",
 password:"1354948945415616571651765156741675174657414765156489649949"   
})