import express from "express";
import postStreams from "../Service/createStreams";
import { catchAsync } from "../lib/catchasync";
import upvoteStreams from "../Service/upvoteStreams";
import getTopStreams from "../Service/getTopStream";
const router = express.Router();
router.post("/postStreams", catchAsync(postStreams)); 
router.get("/getTopStream",catchAsync(getTopStreams))
router.post("/upvote",catchAsync(upvoteStreams))
export default router;
