import express from "express";
import postStreams from "../Service/createStreams";
import { catchAsync } from "../lib/catchasync";
import upvoteStreams from "../Service/upvoteStreams";
import getTopStreams from "../Service/getStream";
import downvoteStreams from "../Service/downvoteStreams";
import playNext from "../Service/playNext";
const router = express.Router();
router.post("/postStreams", catchAsync(postStreams)); 
router.get("/getTopStream",catchAsync(getTopStreams))
router.post("/upVote",catchAsync(upvoteStreams))
router.post("/downVote",catchAsync(downvoteStreams))
router.post("/playNext",catchAsync(playNext)) 
export default router;
