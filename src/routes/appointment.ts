import { Router } from "express";
import { doctorAuthMiddleware, userAuthMiddleware } from "../middlewares/auth";
import { createAppointment, getAppointmentsByDoctorId, getAppointmentsByUserId } from "../controllers/appointment";

const appointmentRouter: Router = Router();

appointmentRouter.post('/', userAuthMiddleware, createAppointment);
appointmentRouter.get('/user', userAuthMiddleware, getAppointmentsByUserId);
appointmentRouter.get('/doctor', doctorAuthMiddleware, getAppointmentsByDoctorId);

export default appointmentRouter;