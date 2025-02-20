import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';

export const getDatabaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT', 5432),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
  entities: [User],
  synchronize: true, // Temporalmente true para crear las tablas
  logging: true,
  ssl: {
    rejectUnauthorized: false
  },
  extra: {
    ssl: {
      rejectUnauthorized: false
    }
  }
});