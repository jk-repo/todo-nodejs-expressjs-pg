import express, {
    Request,
    Response,
    NextFunction
} from "express";
import * as bcrypt from 'bcrypt'
import * as common from '../common/index'
import * as entity from '../models/entities/index'
import * as middleware from '../middleware/index'
import * as services from '../services/index'

export const profileRouter = express.Router();

profileRouter.route(common.urls.profile)
    .get([middleware.isAuthUser, middleware.sessionHandler], (req: Request, res: Response, next: NextFunction) => {
        res.locals.title = common.titles.profile_page_title
        return res.render(common.pages.profile);
    })
    .post([middleware.isAuthUser, middleware.sessionHandler], (req: Request, res: Response, next: NextFunction) => {

        let input = req.body
        const user = new entity.User()
        user.firstName = input.firstName
        user.lastName = input.lastName
        user.email = input.email
        user.username = input.username

        services.updateUser(user).then((result) => {
            if(result){
                req.session.user = result
                req.session.message = common.success.update_success
                req.session.isSuccess = true
                return res.redirect(common.urls.profile);
            }
            else{
                req.session.message = common.errors.server_error
                req.session.isSuccess = false
                return res.redirect(common.urls.profile);
            }
        }).catch((error:any) => {
            common.config.logError(error);
            next(error);      
        });
    })

profileRouter.route(common.urls.updatePassword)
    .get([middleware.isAuthUser, middleware.sessionHandler], (req: Request, res: Response, next: NextFunction) => {
        res.locals.title = common.titles.password_page_title
        return res.render(common.pages.updatePassword);
    })
    .post([middleware.isAuthUser, middleware.sessionHandler], async (req: Request, res: Response, next: NextFunction) => {
        let input = req.body
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(input.password, salt);
        services.updatePassword(req.session.user.username,password).then((result) => {
            if(result){
                req.session.message = common.success.update_success
                req.session.isSuccess = true
                return res.redirect(common.urls.updatePassword);
            }
            else{
                req.session.message = common.errors.server_error
                req.session.isSuccess = false
                return res.redirect(common.urls.updatePassword);
            }
        }).catch((error:any) => {
            common.config.logError(error);
            next(error);      
        });
    })