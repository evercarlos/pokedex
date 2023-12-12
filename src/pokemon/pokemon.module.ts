import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    ConfigModule, // Para el error de pokemon.service.ts :: configService

    MongooseModule.forFeature([
      {
        name: Pokemon.name, //name: sale de documento
        schema: PokemonSchema
      }
    ])
  ],
  exports: [
    MongooseModule // exportar para que otros modulos usen el model
  ]
})
export class PokemonModule {}
