import express from "express"
import cors from 'cors';
import streamsController from "./Controller/streamsController"
import signUp from "./Controller/signUp"
import signIn from "./Controller/signIn"
import spaceController from "./Controller/spaceController"
import cookieParser from 'cookie-parser';
import dotenv from "dotenv"
import jwtMiddleware from "./JWT/middleware";
dotenv.config() ;
const app =express()
app.use(cors()); 
app.use(express.json());
app.use(cookieParser());
app.use("/steam",streamsController) ;
app.use("/signup",signUp)
app.use("/signin",signIn)
app.use("/space", spaceController)
app.listen(process.env.PORT, () => {
    console.log("Server running on port 3000");
  });