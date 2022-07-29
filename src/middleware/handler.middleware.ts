import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import * as common from "../common/index";
dotenv.config();

export const errorHandler = (
    error: common.Exception.HttpErrorException,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    response.locals.name = "Application Error";
    response.locals.title = "Error in Page";
    response.locals.description = "";
    response.locals.menu = "";
    response.locals.message = "";
    response.locals.errorMessage = error.message || "It's not you. It's us. We are having some problems.";
    response.locals.error = (process.env.ENVIRONMENT === 'dev') ? error : {};
    common.config.logError(error);
    response.render(common.pages.error);
};

export const notFoundHandler = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    response.locals.name = "404";
    response.locals.title = "Page not found";
    response.locals.description = "";
    response.locals.menu = "";
    response.locals.message = "";
    response.render(common.pages[404]);
};


