import { Request, Response } from "express";
import { prismaClient } from "../lib/db";
import { upvoteRequestDto } from "../DTO/request";
import { YT_REGX ,SPT_REGEX } from "../lib/constants";
import { GetVideoDetails } from "youtube-search-api";
const upvoteStreams  = async (req: Request, res: Response) => {
  try {
    const data = upvoteRequestDto.parse(req.body);

    const res1 = await GetVideoDetails(data.streamId)
    console.log(res1)
    // create  upvote of stream using userId and streamId 
    return res.status(200).json({res1}) ;

    
  } catch (e) {
    console.error("Unexpected error:", e);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default upvoteStreams  ;
