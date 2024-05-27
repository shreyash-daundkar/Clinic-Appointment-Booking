import { Request, Response, NextFunction } from "express";
import { Prisma } from "..";
import { Appointment, Slot } from "@prisma/client";
import { HttpException } from "../exception";

export const createAppointment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user, type, note, slotId} = req.body;
    
        const appointment: Appointment = await Prisma.$transaction(async prisma => {

            const slot: Slot = await prisma.slot.update({
                where:{
                    id: slotId,
                    isActive: true,
                },
                data: {
                    isActive: false,
                }
            })

            const appointment: Appointment = await prisma.appointment.create({
                data: {
                    doctorId: slot.doctorId,
                    userId: user.id,
                    slotId,
                    type,
                    note,
                }
            });

            return appointment

        });
    
        return res.status(201).json({
            message: 'Appointment created successfully', 
            data: appointment,
            success: true,
        });
        
    } catch (error) {
        return next(new HttpException('Error Creating appointment', error, 500));
    }
};


export const getAppointmentsByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user } = req.body;

        const appointments = await Prisma.appointment.findMany({
            where: {
                userId: user.id
            }
        });
    
        return res.status(201).json({
            message: 'Fetched appointments successfully', 
            data: appointments,
            success: true,
        });
        
    } catch (error) {
        return next(new HttpException('Error fetching appointment', error, 500));
    }
};


export const getAppointmentsByDoctorId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { doctor } = req.body;

        const appointments = await Prisma.appointment.findMany({
            where: {
                doctorId: doctor.id
            }
        });
    
        return res.status(201).json({
            message: 'Fetched appointments successfully', 
            data: appointments,
            success: true,
        });
        
    } catch (error) {
        return next(new HttpException('Error fetching appointment', error, 500));
    }
};