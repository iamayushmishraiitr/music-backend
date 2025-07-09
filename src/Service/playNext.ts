import { Request, Response } from "express";
import { playNextDTO } from "../DTO/request";
import { db } from "../lib/db";
const playNext = async (req: Request, res: Response) => {
  try {
    const data = playNextDTO.parse(req.body);

    const space = await db.space.findUnique({
      where: { id: data.spaceId },
    });
    
    if (space?.hostId !== data.userId) {
      return res.status(403).json({ message: "Only host can change current stream." });
    }
    
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
   return res.status(200).json({ message : "Updates The current stream of the space"})
  } catch (error) {
    console.log(error) ;
    return res.status(500).json({ message : "Something went Wrong"} ) ;
  }
};

export default playNext;
