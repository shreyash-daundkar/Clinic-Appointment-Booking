import { Router } from "express";
import { getDoctors, login, signUp } from "../controllers/doctor";
import { userAuthMiddleware } from "../middlewares/auth";

const doctorRouter: Router = Router();

doctorRouter.post('/sign-up', signUp);
doctorRouter.post('/login', login);
doctorRouter.get('/', userAuthMiddleware, getDoctors);

export default doctorRouter;