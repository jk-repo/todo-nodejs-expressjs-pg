import { Request, Response, NextFunction } from "express";
import * as common from '../common/index'

export const isAuthUser = function (req: Request, res: Response, next: NextFunction) {
    if (req.session && !req.session.user) {
      req.session.message = common.errors.session_error
      req.session.isSuccess = false
      return res.redirect(common.urls.login)
    } else if (req.session && req.session.user.id && req.session.user.id > 0) {
      return next();
    } else {
      return res.redirect(common.urls.login)
    }  
}