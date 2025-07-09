import { Request, Response } from "express";
import {createSpaceDto} from "../../DTO/request"
import { db } from "../../lib/db";
const createSpace = async (req: Request, res: Response) => {
  try {
    const data = createSpaceDto.parse(req.body) ;
     await db.space.create({
      data :{
         hostId :data.userId ,
         name : data.name,
         description:data.description
      }
     })
     return res.status(201).json({ message: "Stream created successfully" });
    } catch (e) {
      console.error("Unexpected error:", e);
      return res.status(500).json({ error: "Internal server error" });
    }
};

export default createSpace;

