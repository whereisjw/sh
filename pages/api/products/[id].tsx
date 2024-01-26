import smtpTransport from "@/prisma/email";
import  prisma from "../../../prisma/client";
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
   
if(req.method === 'GET'){
 

const {id}:any = req.query;

const product = await prisma.product.findUnique({
    where:{
        id:+id,
    },
    include:{
        user:true
    }
})
const terms = product?.name.split(" ").map((v)=>({
    name:{
        contains:v,
    },
}))


const relatedProduct = await prisma.product.findMany({
    where:{
        OR:terms,
        id:{
            not:product?.id
        }
    }
})

console.log(relatedProduct);



res.json({ok:true,product,relatedProduct})
}//GET
},{
 cookieName:"shSession",
 password:"1354948945415616571651765156741675174657414765156489649949"   
})