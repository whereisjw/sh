import  prisma from "../../prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { Post } from "@prisma/client";


interface IResponse{
    ok:boolean;
    post:Post
}

export default withIronSessionApiRoute( async function handler(req:NextApiRequest,res:NextApiResponse){
    const {question} = req.body
    const {user} = req.session
if(req.method === 'POST'){


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
if(req.method === 'GET'){
const getPosts = await prisma.post.findMany({
    include:{
        user:true,
        _count:{
            select:{
             Wondering:true,
             Answer:true,
            }
        },
    },

})
res.json({
    ok:true,
    getPosts
})
}
},{
 cookieName:"shSession",
 password:"1354948945415616571651765156741675174657414765156489649949"   
})