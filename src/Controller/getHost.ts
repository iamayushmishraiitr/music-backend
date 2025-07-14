import express, { Request, Response } from "express";
import { catchAsync } from "../lib/catchasync";
import { db } from "../lib/db";

const router = express.Router();

router.get(
  "/",
  catchAsync(async (req: Request, res: Response) => {
    try {
      const spaceId = req.query.spaceId as string;
      if (!spaceId)
        return res.status(400).json({
          message: "Did Bot Found Space Id",
        });
      const response = await db.space.findUnique({
        where: {
            id  : Number(spaceId),
        },
      });
console.log( "adasdasdas   " + response?.hostId)
      return res
        .status(200)
        .json({
           hostId : response?.hostId
        });
    } catch (error) {
      console.log(error);
      return res.status(404).send({ message: "Error Occurred" });
    }
  })
);

export default router;
