import { Request, Response } from "express";
import { playNextDTO } from "../DTO/request";
import { db } from "../lib/db";
const playNext = async (req: Request, res: Response) => {
  try {
    const data = playNextDTO.parse(req.body);
    await db.currentStream.upsert({
      where: {
        userId: data.userId,
        spaceId: data.spaceId,
      },
      update: {
        streamId: data.streamId,
      },
      create: {
        userId: data.userId,
        spaceId: data.spaceId,
        streamId: data.streamId,
      },
    });
    res.status(200).json({ message : "Updates The current stream of the space"})
  } catch (error) {
    console.log(error) ;
    res.status(500).json({ message : "Internal Server Error"} ) ;
  }
};

export default playNext;
