import { Request, Response } from "express";
import { db } from "../lib/db";

const getStreams = async (req: Request, res: Response) => {
  try {
    const spaceIdString = req.query.spaceId as string | undefined;
    if (!spaceIdString) {
      return res.status(400).json({ message: "Invalid SpaceId Created" });
    }
    const spaceId = parseInt(spaceIdString);
    const current = await db.currentStream.findUnique({
      where: {
        spaceId: spaceId,
      },
    });

    const response = await db.space.findUnique({
      where: {
        id: spaceId,
      },
      include: {
        streams: {
          where: {
            active :true
          },
          orderBy: [
            {
              upvotes: {
                _count: "desc",
              },
            },
            {
              createdAt: "asc", 
            },
          ],
          include: {
            upvotes: true,
          },
        },
      },
    });
    

    return res.status(200).json({
      message: "fetced The stream in the space ",
      data: response?.streams,
      hostId : response?.hostId
    });
  } catch (e) {
    console.error("Unexpected error:", e);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default getStreams;
