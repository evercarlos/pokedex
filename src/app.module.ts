import { join } from 'path'; // node
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config'; // Para variables de entorno
import { AppConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';

@Module({
  imports: [
    // siempre va al inicio
    ConfigModule.forRoot({
      load: [AppConfiguration], //load: Para cargar configuraciones
      validationSchema: JoiValidationSchema,// Valida
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
    }),
    
    MongooseModule.forRoot(process.env.MONGODB,{
      dbName: 'pokmonsdb' // especialmente para pruebas en railway. Evitar mostrar bd por default: test
    }), // 'mongodb://localhost:27017/nest-pokemon'

    PokemonModule,

    CommonModule,

    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {
    //console.log(process.env);
  }
}
