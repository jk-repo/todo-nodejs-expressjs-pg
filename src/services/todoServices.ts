import { Exception } from "../common";
import * as entity from "../models/entities/index"
import { AppDataSource } from "../ormconfig"

const todoRepository = AppDataSource.getRepository(entity.Todo)

export const getAllTodo = (username: string) => {
    return new Promise((resolve, reject) =>{
        todoRepository.findBy({ user : {username : username}, isActive : true}).then((result) => {
            return resolve(result)
        }).catch((err: any) => {
            return reject(err)
        });   
    })
};

export const newTodo = (data: entity.Todo) => {
    return new Promise((resolve, reject) =>{
        todoRepository.save(data).then((result) => {
            return resolve(result)
        }).catch((err: any) => {
            return reject(err)
        });   
    })
};

export const completeTodo = (todoId: number) => {
    return new Promise((resolve, reject) =>{
        todoRepository.findOneBy({ id: todoId }).then((result) =>{
            result.isCompleted = result.isCompleted ? false : true
            todoRepository.save(result)
            return resolve(result);
        }).catch((err: any) => {
            return reject(err)
          });    
    })
};

export const deleteTodo = (todoId: number) => {
    return new Promise((resolve, reject) =>{
        todoRepository.findOneBy({ id: todoId }).then((result) =>{
            result.isActive = false
            todoRepository.save(result)
            return resolve(result);
        }).catch((err: any) => {
            return reject(err)
          });    
    })
};
