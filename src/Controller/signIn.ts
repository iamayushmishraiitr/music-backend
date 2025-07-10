import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { catchAsync } from "../lib/catchasync";
import generateToken from "../JWT/generateToken";

const prisma = new PrismaClient();
const router = express.Router();

type UserCreateInput = {
  email: string;
  password: string;
};

router.post(
  "/",
  catchAsync(async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const response = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!response) {
        return res.status(400).json({ message: "Incorrect Email" });
      }
      const isPasswordValid = await bcrypt.compare(password, response.password);
      if(!isPasswordValid){
        return res.status(400).json({ message: "Incorrect Password" });
      }
       const token =generateToken(response.username,response.id) ;
       return res.status(200).json({ message: "Received Data successfully" , token:token ,username : response.username,userId:response.id });
    } catch (error) {
      console.log(error);
      return res.status(404).send({ message: "Error Occurred" });
    }
  })
);

export default router;
