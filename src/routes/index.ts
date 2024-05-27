import { Router } from "express";
import userRouter from "./user";
import doctorRouter from "./doctor";
import slotRouter from "./slot";
import appointmentRouter from "./appointment";

const indexRouter: Router = Router();

indexRouter.use('/user', userRouter);
indexRouter.use('/doctor', doctorRouter);
indexRouter.use('/slot', slotRouter);
indexRouter.use('/appointment', appointmentRouter);

export default indexRouter;