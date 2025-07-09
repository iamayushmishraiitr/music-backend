import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { catchAsync } from "../lib/catchasync";

const prisma = new PrismaClient();
const router = express.Router();

type UserCreateInput = {
  username: string;
  email: string;
  password: string;
};

router.post("/", catchAsync(async(req:Request, res:Response) => {
  try {
    const { username, email, password } = req.body;
    const saltRounds = 6;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const userData: UserCreateInput = {
      username,
      email,
      password: hashedPassword,
    };

    const response = await prisma.user.create({
      data: userData,
    });

    console.log(req.body);
    return res.status(200).json({ message: "Received Data successfully" });
  } catch (error) {
    console.log(error);
    return res.status(404).send({ message: "Error Occurred" });
  }
}));

export default router;