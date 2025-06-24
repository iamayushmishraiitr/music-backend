import express from "express";
import postStreams from "../Service/postStreams";
import { catchAsync } from "../lib/catchasync";
import upvoteStreams from "../Service/upvoteStreams";
const router = express.Router();
router.post("/postStreams", catchAsync(postStreams)); 
router.get("/getStreams")
router.post("/upvote",catchAsync(upvoteStreams))
export default router;
