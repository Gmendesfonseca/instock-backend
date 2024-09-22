import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  connection: process.env.DATABASE_CONNECTION,
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT, 10),
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
}));
