import { Request, Response, NextFunction } from "express";
import { Prisma } from "..";
import { HttpException } from "../exception";
import { compare, hash } from "bcrypt";
import { Doctor } from '@prisma/client'
import { sign } from "jsonwebtoken";
import { JWT_SECRET } from "../utils/variables";


export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, contact, password } = req.body;
    
        let exDoctor = await Prisma.doctor.findUnique({
            where: { contact },
        });
    
        if (exDoctor) {
            return next( new HttpException(
                'Doctor already exists!', 
                null, 
                404,
            ));
        }
    
        const encryptPassword = await hash(password, 10);
    
        const doctor: Doctor= await Prisma.doctor.create({
            data: {
                name,
                contact,
                password: encryptPassword,
            }
        });
    
        return res.status(201).json({
            message: 'Docker created successfully', 
            data: doctor,
            success: true,
        });
        
    } catch (error) {
        return next(new HttpException('Error Singing Up', error, 500));
    }

};


export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { contact, password } = req.body;
    
        const doctor = await Prisma.doctor.findUnique({
            where: { contact },
        });
    
        if (!doctor) {
            return next( new HttpException(
                'Doctor not exists!',  
                null,
                404,
            ));
        }
    
        const passwordVerified = await compare(password, doctor!.password);
    
        if(!passwordVerified) {
            return next( new HttpException(
                'Incorrect Password',  
                null,
                400,
            ));
        }
    
        const token = await sign({
            userId: doctor!.id,
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


export const getDoctors = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const doctors = await Prisma.doctor.findMany();
    
        if (doctors.length === 0) {
            return next( new HttpException(
                'Doctor not exists!',  
                null,
                404,
            ));
        }
    
        return res.status(201).json({
            message: 'Fetch Doctor successfully', 
            data: doctors,
            success: true,
        });
        
    } catch (error) {
        return next(new HttpException('Errorr Fetching Doctors', error, 500));
    }

};