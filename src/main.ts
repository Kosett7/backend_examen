import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';

async function testDatabaseConnection(dataSource: DataSource) {
  try {
    await dataSource.query('SELECT 1');
    console.log('Conexión a la base de datos probada exitosamente');
  } catch (error) {
    console.error('Error al probar la conexión a la base de datos:', error);
    throw error;
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('HTTP');
  
  // Añadir prefijo global para la API
  app.setGlobalPrefix('api');
  
  // Añadir middleware de logging
  app.use((req, res, next) => {
    logger.log(`${req.method} ${req.originalUrl}`);
    next();
  });
  
  // Verificar conexión a la base de datos
  try {
    const dataSource = app.get(DataSource);
    if (dataSource.isInitialized) {
      console.log('Conexión a la base de datos establecida:', {
        database: dataSource.options.database,
        type: dataSource.options.type,
        isConnected: dataSource.isInitialized
      });
    }
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
  
  app.enableCors({
    origin: 'http://localhost:3001',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Probar la conexión
  await testDatabaseConnection(app.get(DataSource));

  await app.listen(3000);
}
bootstrap();