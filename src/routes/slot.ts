import { Router } from "express";
import { createSlot, getSlot } from "../controllers/slot";
import { doctorAuthMiddleware, userAuthMiddleware } from "../middlewares/auth";

const slotRouter: Router = Router();

slotRouter.post('/', doctorAuthMiddleware, createSlot);
slotRouter.get('/:id', userAuthMiddleware, getSlot);

export default slotRouter;