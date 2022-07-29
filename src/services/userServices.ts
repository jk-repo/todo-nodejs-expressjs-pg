import * as entity from "../models/entities/index"
import { AppDataSource } from "../ormconfig"

const userRepository = AppDataSource.getRepository(entity.User)

export const newUser = (data: entity.User) => {
    return new Promise((resolve, reject) =>{
        userRepository.findOneBy({ username: data.username }).then((result) =>{
            if(result){
                return resolve(false)
            }
            else{
                userRepository.save(data)
                return resolve(true)
            }
        }).catch((err: any) => {
            return reject(err)
        });
    })
};

export const updateUser = (data: entity.User) => {
    return new Promise((resolve, reject) =>{
        userRepository.findOneBy({ username: data.username }).then((result) =>{
            result.firstName = data.firstName
            result.lastName = data.lastName
            result.email = data.email
            userRepository.save(result)
            return resolve(result);
        }).catch((err: any) => {
            return reject(err)
        });    
    })
};

export const updatePassword = (username: string, password: string) => {
    return new Promise((resolve, reject) =>{
        userRepository.findOneBy({ username: username }).then((result) =>{
            result.password = password
            userRepository.save(result)
            return resolve(result);
        }).catch((err: any) => {
            return reject(err)
          });    
    })
};

export const getUserByUsername = async (username: string) => {
    const result = userRepository.findOneBy({ username: username });
    return result;
};