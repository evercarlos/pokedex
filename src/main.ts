import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({ // pipe global para dto
        whitelist: true, // solo acepta la data qu estoy esperando (dto)
        forbidNonWhitelisted: true, // Si propidades que no estan en el dto, muestra mensaje que "no existe esos atributos"
        transform:true,  // paa convertir nuevos enviados en string por el queryParameters a number
        transformOptions: {
          enableImplicitConversion: true // paa convertir nuevos enviados en string por el queryParameters a number
        }
      }),
    );
    
  app.setGlobalPrefix('api/v2') // Parte de la url base

  await app.listen(process.env.PORT);
  console.log(`App running on port ${ process.env.PORT }`);
}
bootstrap();
