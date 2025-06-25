import { Request, Response } from "express";
import { db } from "../lib/db";
import { streamRequestDto } from "../DTO/request";
import { YT_REGX, SPT_REGEX } from "../lib/constants";
import { GetVideoDetails } from "youtube-search-api";
const postStreams = async (req: Request, res: Response) => {
  try {
    const data = streamRequestDto.parse(req.body);
    if (!YT_REGX.test(data.url) && !SPT_REGEX.test(data.url)) {
      return res
        .status(400)
        .json({
          error:
            "Invalid URL format. Only YouTube or Spotify links are allowed.",
        });
    }
    let extractedId: string | undefined;
    if (YT_REGX.test(data.url)) extractedId = data.url.split("?v=")[1];
    if (SPT_REGEX.test(data.url))
      extractedId = data.url.split("/").filter(Boolean).pop();
    if (!extractedId) {
      return res
        .status(400)
        .json({
          error:
            "Invalid URL format. Only YouTube or Spotify links are allowed.",
        });
    }

    const streamData = await GetVideoDetails(extractedId);
    const thumbnail = streamData.thumbnail;
    thumbnail.sort((a: any, b: any) => a.width - b.width);

    await db.stream.create({
      data: {
        userId: data.userId,
        type: "youtube",
        extractedId,
        url: data.url,
        bigImage: thumbnail[thumbnail.length - 1],
        spaceId:data.spaceId,
        smallImage:
          thumbnail.length > 1
            ? thumbnail[thumbnail.length - 2]
            : thumbnail[thumbnail.length - 1],
      },
    });

    return res.status(201).json({ message: "Stream created successfully" });
  } catch (e) {
    console.error("Unexpected error:", e);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default postStreams;
