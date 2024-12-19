import { DataSource } from 'typeorm';
import { Customer } from '../models/Customer';
import { User } from '../models/User'
import * as dotenv from 'dotenv';
dotenv.config();

//configration database

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: (process.env.DB_PORT as unknown as number) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // Set to true
  logging: process.env.DB_LOGS === 'true',
  entities: [Customer, User],
});

export default AppDataSource;
