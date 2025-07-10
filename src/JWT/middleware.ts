import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
  user?: any;
}

const jwtMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const secretKey = process.env.Secret;
  const token = req.cookies?.token;

  if (!token) {
    res.status(401).json({ error: 'No token provided' });
    return;
  }

  if (!secretKey) {
    res.status(500).json({ error: 'Server error: Secret key not defined' });
    return;
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('JWT verification error:', err);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export default jwtMiddleware;
