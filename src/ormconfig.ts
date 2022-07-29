import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
dotenv.config();

let host = (process.env.DB_HOST) ? (process.env.DB_HOST as string) : 'localhost';
let port = (process.env.DB_PORT) ? Number(process.env.DB_PORT) : 5432;
let username = (process.env.DB_USERNAME) ? (process.env.DB_USERNAME as string) : 'postgres';
let password = (process.env.DB_PASSWORD) ? (process.env.DB_PASSWORD as string) : 'root';
let database = (process.env.DB_DATABASE) ? (process.env.DB_DATABASE as string) : 'shopify';

export const AppDataSource = new DataSource({    
    type: 'postgres',
    host: host,
    port: port,
    username: username,
    password: password,
    database: database,
    synchronize: false,
    entities: [
        'src/models/entities/**/*{.ts,.js}',
    ],
    migrations: ["src/models/migrations/**/*.ts"],   
    
});

// export default AppDataSource;
