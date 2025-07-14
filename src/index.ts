import express, { Request, Response } from "express";
import cors from "cors";
import streamsController from "./Controller/streamsController";
import signUp from "./Controller/signUp";
import signIn from "./Controller/signIn";
import spaceController from "./Controller/spaceController";
import cookieParser from "cookie-parser";
import getHost from "./Controller/getHost"
import dotenv from "dotenv";
import http from "http";
import { WebSocketServer ,WebSocket }   from "ws";
import { RoomManager } from "./RoomManager";

dotenv.config();
const app = express();
const server = http.createServer(app);
app.use(
  cors({
    origin: ["https://music-frontend-yymr.vercel.app", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST"],
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
app.use("/getHost", getHost)
const wss = new WebSocketServer({ server });

const handleConnection = (ws :WebSocket)=>{
  console.log("WebSocket connection established");
  ws.on("message", async function message(raw: string) {
    try {
      const { type, data }: { type: string; data: any } = JSON.parse(raw);
      switch (type) {
        case "join-room":
          RoomManager.getInstance()?.joinRoom(data.spaceId, data.hostId, data.userId, ws);
          break;
        case "add-to-queue" :
          RoomManager.getInstance()?.addToQueue(data) 
          break ; 
        case "play-next" :
          RoomManager.getInstance()?.playNext(data) 
          break ; 
        case "upVote" :
            RoomManager.getInstance()?.upVote(data) 
            break ; 
        case "downVote" :
              RoomManager.getInstance()?.downVote(data) 
              break ; 
         default:
          console.warn(`Unhandled message type: ${type}`);
          break;
      }
    } catch (err) {
      console.error("Invalid WebSocket message:", err);
      ws.send(JSON.stringify({ type: "error", message: "Invalid message format" }));
    }
  });  

  ws.onclose = () => {
    console.log("WebSocket closed");
  };
}

wss.on("connection", (ws: any) => handleConnection(ws));
server.listen(process.env.PORT, () => {
  console.log(`Server running  on port ${process.env.PORT} `);
});
