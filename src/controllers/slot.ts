import { Request, Response, NextFunction } from "express";
import { Prisma } from "..";
import { HttpException } from "../exception";
import { Slot } from "@prisma/client";

export const createSlot = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { date, time, doctor} = req.body;
    
        const slot: Slot= await Prisma.slot.create({
            data: {
                doctorId: doctor.id,
                date: new Date(date),
                time,
            }
        });
    
        return res.status(201).json({
            message: 'Slot created successfully', 
            data: slot,
            success: true,
        });
        
    } catch (error) {
        return next(new HttpException('Error Creating Slot', error, 500));
    }
};


export const getSlotByDoctorId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
    
        const slots = await Prisma.slot.findMany({
            where: {
                doctorId: +id,
                isActive: true,
            }
        });
    
        return res.status(201).json({
            message: 'Fetched Slot successfully', 
            data: slots,
            success: true,
        });
        
    } catch (error) {
        return next(new HttpException('Error fetching Slot', error, 500));
    }
};


export const getSlot = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { doctor } = req.body;
    
        const slots = await Prisma.slot.findMany({
            where: {
                doctorId: doctor.id,
                isActive: true,
            }
        });
    
        return res.status(201).json({
            message: 'Fetched Slot successfully', 
            data: slots,
            success: true,
        });
        
    } catch (error) {
        return next(new HttpException('Error fetching Slot', error, 500));
    }
};