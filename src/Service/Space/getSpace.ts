import { Request, Response } from 'express';
import { db } from '../../lib/db';
import { date } from 'zod';

const getSpaces = async (req: Request, res: Response) => {
    const userIdString = req.query.userId as string | undefined;
    const userId: number | null = userIdString ? parseInt(userIdString) : null;
    if (!userId) {
        return res.status(400).json({ error: 'userId is required and should be a number' });
    }
    const res1= await db.space.findMany({
        where :{
            hostId :userId 
        } ,
        include:{
            streams :true 
        }
    })
    return res.json({ message: `Fetched spaces for user ${userId}` , data : res1});
};

export default getSpaces;
