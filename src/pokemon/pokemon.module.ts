import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
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
