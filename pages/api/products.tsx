import smtpTransport from "@/prisma/email";
import prisma from "../../prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

 
interface IResponse{
    ok?:boolean;
    [key:string]:any;
}

export default withIronSessionApiRoute( async function handler(req:NextApiRequest,res:NextApiResponse<IResponse>){
   const {name,price,description} =req.body;
   const {user} = req.session;
if(req.method === 'GET'){
    const products = await prisma.product.findMany({

    })
    res.json({products})
}
if(req.method === 'POST'){
    const products = await prisma.product.create({
    data:{
        name,
        price,
        description,
        image:'1',
        category:'덤벨',
        user:{
            connect:{
                id:user?.id,
            }
        }
    }
    }) 
    res.json({ok:true,products})
}//GET
},{
 cookieName:"shSession",
 password:"1354948945415616571651765156741675174657414765156489649949"   
})