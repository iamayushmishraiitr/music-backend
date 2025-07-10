import jwt  from "jsonwebtoken"
import dontenv from "dotenv"
dontenv.config() 
const SecretKey = process.env.SECRETKEY || "asd"
const generateToken = (username:string,userId:number) :string => {
  const token = jwt.sign(
    {
     username: username,
     userId
    },
    SecretKey,
    { expiresIn: '3d' }
  );
  return token;
};

export default generateToken