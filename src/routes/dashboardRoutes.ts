import express, {
    Request,
    Response,
    NextFunction
} from "express";
import * as common from '../common/index'
import * as entity from '../models/entities/index'
import * as middleware from '../middleware/index'
import * as services from '../services/index'

export const dashboardRouter = express.Router();

dashboardRouter.route(common.urls.dashboard)
    .get([middleware.isAuthUser, middleware.sessionHandler], (req: Request, res: Response, next: NextFunction) => {
        services.getAllTodo(req.session.user.username).then((result) => {
            res.locals.todoList = result
            res.locals.title = common.titles.dashboard_page_title
            return res.render(common.pages.dashboard);
        }).catch((error) => {
            next(error)
        })
    })

dashboardRouter.route(common.urls.todoAdd)
    .post([middleware.isAuthUser, middleware.sessionHandler], (req: Request, res: Response, next: NextFunction) => {
        if (req.body && req.body.todo) {
            const todo = new entity.Todo
            todo.user = req.session.user
            todo.todo = req.body.todo
            services.newTodo(todo).then((result) => {
                res.status(200).json({ status: true, data: result['id'] });
            }).catch((error:any) => {
                common.config.logError(error);
                res.status(500).json({ status: false, data: common.errors.app_error });
            });            
        }
        else{
            res.status(417).json({ status: false, message: common.errors.expectation_error });
        }        
    })

dashboardRouter.route(common.urls.todoComplete)
    .post([middleware.isAuthUser, middleware.sessionHandler], (req: Request, res: Response, next: NextFunction) => {
        if (req.body && req.body.id) {            
            const id = req.body.id
            services.completeTodo(id).then((result) => {
                res.status(200).json({ status: true, data: result['id'] });
            }).catch((error:any) => {
                common.config.logError(error);
                res.status(500).json({ status: false, data: common.errors.app_error });
            });            
        }
        else{
            res.status(417).json({ status: false, message: common.errors.expectation_error });
        }        
    })

dashboardRouter.route(common.urls.todoDelete)
    .post([middleware.isAuthUser, middleware.sessionHandler], (req: Request, res: Response, next: NextFunction) => {
        if (req.body && req.body.id) {            
            const id = req.body.id
            services.deleteTodo(id).then((result) => {
                res.status(200).json({ status: true, data: result['id'] });
            }).catch((error:any) => {
                common.config.logError(error);
                res.status(500).json({ status: false, data: common.errors.app_error });
            });            
        }
        else{
            res.status(417).json({ status: false, message: common.errors.expectation_error });
        }        
    })