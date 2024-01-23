import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/client";

export default async function handler (req:NextApiRequest,res:NextApiResponse){

    await prisma.user.create({
        data:{
            email:'hi',
            name:'hi',
        }
    })

    res.json({ok:true})
}