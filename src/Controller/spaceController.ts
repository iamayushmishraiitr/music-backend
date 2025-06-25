import express from "express";
import postStreams from "../Service/createStreams";
import { catchAsync } from "../lib/catchasync";
import upvoteStreams from "../Service/upvoteStreams";
const router = express.Router();
router.post("/createSpace"); 
router.get("/getSpace")

export default router;
