import express from "express"
import cors from 'cors';
import streamsController from "./Controller/streamsController"
import signUp from "./Controller/signUp"
import spaceController from "./Controller/spaceController"
import dotenv from "dotenv"
dotenv.config() ;
const app =express()
app.use(cors()); 
app.use(express.json());
app.use("/steam",streamsController) ;
app.use("/signup",signUp)
app.use("/space",spaceController)
app.listen(process.env.PORT, () => {
    console.log("Server running on port 3000");
  });