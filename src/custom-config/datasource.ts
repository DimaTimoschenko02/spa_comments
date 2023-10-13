import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config({
  path: `.env`,
});

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  migrations: ['src/custom-config/migrations/*{.ts,.js}'],
  synchronize: false,
});
