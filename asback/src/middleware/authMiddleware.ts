import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateJWT = (req: any, res: any, next: NextFunction) => {
    
    const token = req.headers.authorization?.split(' ')[1];


    if (!token) {
        return res.status(403).json({ message: 'Access denied. No token provided.' });
    }

    jwt.verify(token, process.env.JWT_SECRET!, (err:any, user:any) => {
        
        if (err) {
            return res.status(403).json({ message: 'Invalid token.' });
        }
        
        req.user = user;
        next(); 
    });
};
