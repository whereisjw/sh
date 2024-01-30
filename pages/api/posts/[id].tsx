import smtpTransport from "@/prisma/email";
import  prisma from "../../../prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";





export default withIronSessionApiRoute( async function handler(req:NextApiRequest,res:NextApiResponse){
   
if(req.method === 'GET'){
const {id}:any = req.query
const post = await prisma.post.findUnique({
 where:{
    id:+id
 },
 include:{
    user:true
 }
})

res.json({
    ok:true,
    post
})

}//GET
},{
 cookieName:"shSession",
 password:"1354948945415616571651765156741675174657414765156489649949"   
})