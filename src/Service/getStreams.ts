import { Request, Response } from "express";
import { prismaClient } from "../lib/db";
import { streamRequestDto } from "../DTO/request";
import { YT_REGX, SPT_REGEX } from "../lib/constants";
import { GetVideoDetails } from "youtube-search-api";
const getStreams = async (req: Request, res: Response) => {
  try {
      
  } catch (e) {
    console.error("Unexpected error:", e);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default getStreams ;
