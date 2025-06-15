import express from "express"
import cors from 'cors';
import streamsController from "./Controller/streamsController"
const app =express()
app.use(cors()); 
app.use(express.json());
app.use("/steam",streamsController) ;
app.listen(3000, () => {
    console.log("Server running on port 3000");
  });