import { Request, Response, NextFunction } from "express";
import { Prisma } from "..";
import { HttpException } from "../exception";
import { compare, hash } from "bcrypt";
import { User } from '@prisma/client'
import { sign } from "jsonwebtoken";
import { JWT_SECRET } from "../utils/variables";


export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, contact, password } = req.body;
    
        let exUser = await Prisma.user.findUnique({
            where: { contact },
        });
    
        if (exUser) {
            return next( new HttpException(
                'User already exists!', 
                null, 
                404,
            ));
        }
    
        const encryptPassword = await hash(password, 10);
    
        const user: User= await Prisma.user.create({
            data: {
                name,
                contact,
                password: encryptPassword,
            }
        });
    
        return res.status(201).json({
            message: 'User created successfully', 
            data: user,
            success: true,
        });
        
    } catch (error) {
        return next(new HttpException('Error Singing Up', error, 500));
    }

};


export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { contact, password } = req.body;
    
        const user = await Prisma.user.findUnique({
            where: { contact },
        });
    
        if (!user) {
            return next( new HttpException(
                'User not exists!',  
                null,
                404,
            ));
        }
    
        const passwordVerified = await compare(password, user!.password);
    
        if(!passwordVerified) {
            return next( new HttpException(
                'Incorrect Password',  
                null,
                400,
            ));
        }
    
        const token = await sign({
            userId: user!.id,
        }, JWT_SECRET);
    
        return res.status(201).json({
            message: 'Login successfully', 
            data: token,
            success: true,
        });
        
    } catch (error) {
        return next(new HttpException('Errorr login', error, 500));
    }

};