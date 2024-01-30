import  prisma from "../../../../prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";


 

export default withIronSessionApiRoute( async function handler(req:NextApiRequest,res:NextApiResponse){
const {id}:any = req.query
const {user} = req.session
if(req.method === 'POST'){
const alreadyExist = await prisma.wondering.findFirst({
    where:{
        userId:user?.id,
        postId:+id
    }
})
if(alreadyExist) {
    await prisma.wondering.delete({
    where:{
        id:alreadyExist.id
    }
})}else{
 await prisma.wondering.create({
    data:{
        user:{
            connect:{
                id:user?.id
            },
        },
        post:{
            connect:{
                id:+id
            }
        }
    }
 })
}//ifelse


res.json({ok:true})
}//POST
},{
 cookieName:"shSession",
 password:"1354948945415616571651765156741675174657414765156489649949"   
})