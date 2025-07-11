import { Request, Response } from "express";
import { db } from "../lib/db";
import { streamRequestDto } from "../DTO/request";
import { YT_REGX, SPT_REGEX } from "../lib/constants";
import { GetVideoDetails } from "youtube-search-api";
const postStreams = async (req: Request, res: Response) => {
  try {
    const data = streamRequestDto.parse(req.body);

   const response= await db.stream.create({
      data: {
        userId: Number(data.userId),
        type: "youtube",
        extractedId : data.extractedId,
        url: data.url,
        bigImage: "" ,
        spaceId:Number(data.spaceId),
        smallImage: ""
      }
    });
    return res.status(201).json({ message: "Stream created successfully" , body :response });
  } catch (e) {
    console.error("Unexpected error:", e);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default postStreams;
