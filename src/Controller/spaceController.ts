import express from "express";
import { catchAsync } from "../lib/catchasync";
import createSpace from "../Service/Space/createSpace";
import getSpaces from "../Service/Space/getSpace";
const router = express.Router();
router.post("/createSpace",catchAsync(createSpace)); 
router.get("/getSpaces",catchAsync(getSpaces))

export default router;
