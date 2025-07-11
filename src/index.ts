import express, { Request, Response } from "express";
import cors from "cors";
import streamsController from "./Controller/streamsController";
import signUp from "./Controller/signUp";
import signIn from "./Controller/signIn";
import spaceController from "./Controller/spaceController";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: [
      "https://music-frontend-yymr.vercel.app",
      "http://localhost:5173"
    ],
    credentials: true,
    methods: ["GET", "POST"]
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("The Server is Working");
});
app.use("/signup", signUp);
app.use("/signin", signIn);
app.use("/space", spaceController);
app.use("/stream", streamsController);
app.listen(process.env.PORT, () => {
  console.log(`Server running  on port ${process.env.PORT} `);
});
