import { join } from 'path';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'api',
  password: 'api',
  database: 'core-db',
  logging: true,
  synchronize: false,
  migrationsRun: false,
  entities: [join(__dirname, './src/entities', '*.entity.{js,ts}')],
  migrations: [join(__dirname, './src/migrations', '*.{js,ts}')],
});
