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

export const loginRouter = express.Router();

loginRouter.route(common.urls.login)
    .get([middleware.sessionHandler], (req: Request, res: Response, next: NextFunction) => {
        res.locals.title = common.titles.login_page_title
        return res.render(common.pages.login);
    })
    .post([middleware.sessionHandler], (req: Request, res: Response, next: NextFunction) => {
        const username = req.body.username
        const password = req.body.password
        services.getUserByUsername(username).then(async (result) =>{
            if(result){
                const validPassword = await bcrypt.compare(password, result.password);
                if(validPassword){
                    req.session.user = result
                    res.locals.title = common.titles.login_page_title
                    return res.redirect(common.urls.dashboard);
                }
                else{
                    res.locals.message = common.errors.signin_error
                    res.locals.isSuccess = false
                    res.locals.title = common.titles.login_page_title
                    return res.render(common.pages.login);
                }
            }
            else{
                res.locals.message = common.errors.signin_error
                res.locals.isSuccess = false
                res.locals.title = common.titles.login_page_title
                return res.render(common.pages.login);
            }
        })
    });

loginRouter.route(common.urls.signup)
    .get([middleware.sessionHandler], (req: Request, res: Response, next: NextFunction) => {
        res.locals.title = common.titles.signup_page_title
        return res.render(common.pages.signup);
    })
    .post([middleware.sessionHandler], async (req: Request, res: Response, next: NextFunction) => {
        if (req.body) {
            let input = req.body
            const user = new entity.User()
            user.firstName = input.firstName
            user.lastName = input.lastName
            user.email = input.email
            user.username = input.username
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(input.password, salt);
            services.newUser(user).then((result) => {
                if(result){
                    req.session.message = common.success.signup_success
                    req.session.isSuccess = true
                    return res.redirect(common.urls.login);
                }
                else{
                    req.session.message = common.errors.signup_error
                    req.session.isSuccess = false
                    return res.redirect(common.urls.signup);
                }
            }).catch((error:any) => {
                common.config.logError(error);
                next(error);
            });
        }
        else{
            return res.redirect(common.urls.signup);
        }        
    })

loginRouter.route(common.urls.logout)
    .get([middleware.sessionHandler], (req: Request, res: Response, next: NextFunction) => {
        req.session.destroy((result) => {
            return res.redirect(common.urls.login);
        });    
    })
