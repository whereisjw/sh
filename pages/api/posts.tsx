import  prisma from "../../prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { Post } from "@prisma/client";


interface IResponse{
    ok:boolean;
    post:Post
}

export default withIronSessionApiRoute( async function handler(req:NextApiRequest,res:NextApiResponse){
    const {question,latitude:lat,longitude:lng} = req.body
    const {user} = req.session
    const {latitude,longitude} = req.query
if(req.method === 'POST'){


const post = await prisma.post.create({
    data:{
        question,
        lat:lat ? lat : null,
        lng:lng ? lng : null,
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
/*     where:{
        lat:{
            gte:Number(latitude)-0.01,
            lte:Number(latitude)+0.01,
        },
        lng:{
            gte:Number(longitude)-0.01,
            lte:Number(longitude)+0.01,
        }
    } */
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