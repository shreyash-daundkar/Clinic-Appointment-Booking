import { Router } from "express";
import { login, signUp } from "../controllers/user";

const userRouter: Router = Router();

userRouter.post('/sign-up', signUp);
userRouter.post('/login', login);

export default userRouter;