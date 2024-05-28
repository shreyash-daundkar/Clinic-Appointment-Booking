import { Router } from "express";
import { createSlot, getSlot, getSlotByDoctorId } from "../controllers/slot";
import { doctorAuthMiddleware, userAuthMiddleware } from "../middlewares/auth";

const slotRouter: Router = Router();

slotRouter.post('/', doctorAuthMiddleware, createSlot);
slotRouter.get('/:id', userAuthMiddleware, getSlotByDoctorId);
slotRouter.get('/', doctorAuthMiddleware, getSlot);

export default slotRouter;