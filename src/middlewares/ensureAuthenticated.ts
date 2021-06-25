import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).end();
    }

    const token = authToken.replace("Bearer ", "");

    try {
        const { sub } = verify(token, "a1e6a32626472392807a8983e086abae") as IPayload;
        req.user_id = sub;
        return next();
    } catch (error) {
        return res.status(401).end();
    }
}