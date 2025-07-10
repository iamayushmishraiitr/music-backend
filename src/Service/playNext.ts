import { Request, Response } from "express";
import { playNextDTO } from "../DTO/request";
import { db } from "../lib/db";
import { Prisma } from "@prisma/client";

const playNext = async (req: Request, res: Response) => {
  try {
    const data = playNextDTO.parse(req.body);

    const space = await db.space.findUnique({
      where: { id: data.spaceId },
    });

    if (space?.hostId !== data.userId) {
      return res.status(403).json({ message: "Only host can change current stream." });
    }

    const mostUpvotedStream = await db.stream.findFirst({
      where: {
        userId: data.userId,
        spaceId: data.spaceId,
        active :true
      },
      orderBy: {
        upvotes: {
          _count: "desc",
        },
      },
    });
   
    if (!mostUpvotedStream) {
      return res.status(404).json({ message: "No upvoted streams found to play next." });
    }

    await Promise.all([
      db.currentStream.upsert({
      where: {
        userId_spaceId: {
          userId: data.userId,
          spaceId: data.spaceId,
        },
      },
      update: {
        streamId: mostUpvotedStream.id,
      },
      create: {
        userId: data.userId,
        spaceId: data.spaceId,
        streamId: mostUpvotedStream.id,
      },
    }  ,
  )  ,
  db.stream.update({
    where :{
      id : mostUpvotedStream.id
    } ,
    data :{
      active : false
    }
  })


  ]);
   
    return res.status(200).json({ 
      message: "Updated the current stream of the space", 
      streamId: mostUpvotedStream.id 
    });

  } catch (error) {
    console.error("playNext error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export default playNext;
