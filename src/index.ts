import express from "express"
import cors from 'cors';
import streamsController from "./Controller/streamsController"
import signUp from "./Controller/signUp"
import signIn from "./Controller/signIn"
import spaceController from "./Controller/spaceController"
import cookieParser from 'cookie-parser';
import dotenv from "dotenv"

dotenv.config() ;
const app =express()
app.use(cors()); 
app.use(express.json());
app.use(cookieParser());
app.use("/signup",signUp)
app.use("/signin",signIn)
app.use("/space", spaceController)
app.use("/stream", streamsController); 
app.listen(process.env.PORT, () => {
    console.log(`Server running  on port ${process.env.PORT} `);
  })
  export default app;