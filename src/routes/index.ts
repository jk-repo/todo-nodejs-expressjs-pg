import express from "express";
import { dashboardRouter } from './dashboardRoutes';
import { loginRouter } from './loginRoutes';
import { profileRouter } from "./profileRoutes";

export const indexRouter = express.Router();

indexRouter.use(loginRouter)
indexRouter.use(dashboardRouter)
indexRouter.use(profileRouter)