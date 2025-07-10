import { Request, Response } from "express";
import { db } from "../lib/db";
import { downvoteRequestDto} from "../DTO/request";
const downvoteStreams = async (req: Request, res: Response) => {
  try {
    const data = downvoteRequestDto.parse(req.body);
   await db.upvotes.delete({
      where: {
        userId_streamId : {
        userId:data.userId,
        streamId:data.streamId,
      },
      },
    });
   return res.status(201).json({message:"downvoted Successfully"})
  } catch (e) {
    console.error("Unexpected error:", e);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default downvoteStreams;
