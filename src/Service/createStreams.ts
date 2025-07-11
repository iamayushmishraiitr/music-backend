import { Request, Response } from "express";
import { db } from "../lib/db";
import { streamRequestDto } from "../DTO/request";
import { YT_REGX, SPT_REGEX } from "../lib/constants";
import { GetVideoDetails } from "youtube-search-api";
const postStreams = async (req: Request, res: Response) => {
  try {
    const data = streamRequestDto.parse(req.body);
    const streamData = await GetVideoDetails(data.extractedId);
    const {thumbnails} = streamData.thumbnail
    thumbnails.sort((a: any, b: any) => a.width - b.width);
   const response= await db.stream.create({
      data: {
        userId: Number(data.userId),
        type: "youtube",
        extractedId : data.extractedId,
        url: data.url,
        bigImage: thumbnails[thumbnails.length - 1]?.url,
        spaceId:Number(data.spaceId),
        smallImage:
          thumbnails.length > 1
            ? thumbnails[thumbnails.length - 2]?.url
            : thumbnails[thumbnails.length - 1]?.url,
      },
    });
    return res.status(201).json({ message: "Stream created successfully" , body :response });
  } catch (e) {
    console.error("Unexpected error:", e);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default postStreams;
