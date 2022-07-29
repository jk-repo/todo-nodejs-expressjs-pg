import { Request, Response, NextFunction } from "express";
import * as common from "../common/index"

export const sessionHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let message = ""
    if(req.session.message){
        message = req.session.message
        req.session.message = ""
    }
    let isSuccess = false
    if(req.session.isSuccess){
        isSuccess = req.session.isSuccess
        req.session.isSuccess = false
    }
    res.locals.message = message
    res.locals.isSuccess = isSuccess
    res.locals.user = req.session.user
    res.locals.urls = common.urls
    next()
};


