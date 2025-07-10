import { Request, Response } from "express";
import { db } from "../lib/db";
import { upvoteRequestDto } from "../DTO/request";
const upvoteStreams = async (req: Request, res: Response) => {
  try {
    const data = upvoteRequestDto.parse(req.body);
    await db.upvotes.create({
      data: {
        user: {
          connect: { id: data.userId },
        },
        stream: {
          connect: { id: data.streamId },
        },
      },
    });
   return res.status(201).json({message:"upvoted Successfully"})
  } catch (e) {
    console.error("Unexpected error:", e);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default upvoteStreams;
