import { Request, Response } from "express";
import { db } from "../lib/db";
import { date } from "zod";
const getCurrentStream =  async(req:Request,res:Response) => {
     const spaceId = req.query.spaceId as string|undefined ;
     if(!spaceId) return res.status(400).json({message : "Bad Request"}) ;
     try {
        const topStream= await db.currentStream.findUnique({
            where :{
                spaceId : Number(spaceId) 
            } ,
            include :{
                stream :true 
            }
        })
        
        return res.status(200).json({data :topStream?.stream}) ;
     } catch (error) {
        console.log(error) 
        return res.status(500).json({message : "Interbal Server Error"}) ;
     }
}

export default getCurrentStream