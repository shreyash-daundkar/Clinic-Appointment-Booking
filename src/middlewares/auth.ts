import { Request, Response, NextFunction } from "express";
import { HttpException } from "../exception";
import { JWT_SECRET } from "../utils/variables";
import { verify } from "jsonwebtoken";
import { Prisma } from "..";

export const userAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {   
        
        const token = req.headers.authorization;
        if(!token) {
            return next(new HttpException('Token not found', null, 401));
        }

        const payload = await verify(token, JWT_SECRET);
        if(typeof payload === 'string' || payload === null){
            return next(new HttpException('Fail Auth', null, 401));
        }

        const user = await Prisma.user.findUnique({
            where: { id : payload.userId },
        });

        if(!user) {
            return next( new HttpException(
                'User not exists!',  
                null,
                404,
            ));
        }

        req.body.user = user;
        next()

    } catch (error) {
        return next(new HttpException('Error in Auth', error, 500));
    }
}

export const doctorAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {   
        
        const token = req.headers.authorization;
        if(!token) {
            return next(new HttpException('Token not found', null, 401));
        }

        const payload = await verify(token, JWT_SECRET);
        if(typeof payload === 'string' || payload === null){
            return next(new HttpException('Fail Auth', null, 401));
        }

        const doctor = await Prisma.doctor.findUnique({
            where: { id : payload.userId },
        });

        if(!doctor) {
            return next( new HttpException(
                'User not exists!',  
                null,
                404,
            ));
        }

        req.body.doctor = doctor;
        next()

    } catch (error) {
        return next(new HttpException('Error in Auth', error, 500));
    }
}