import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';

import { ConfigService } from '@nestjs/config'; // Para la inyecion de configService 

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PokemonService {

  private defaultLimit:number;

  // Injeccionde model de mongoose para inyectar al servicio
  constructor(
    @InjectModel(Pokemon.name) //name: del document
    private readonly pokemonModel : Model<Pokemon>,
    private readonly configService: ConfigService
  ) {
     this.defaultLimit = configService.get<number>('defualtLimit');
     //console.log(this.defaultLimit); // Para el defualtLimit de app.config.ts
     //console.log(process.env.DEFAULT_LIMIT); //undefined
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    try {
      
      const pokemon = await this.pokemonModel.create( createPokemonDto );
      return pokemon;

    } catch(error) {
      this.handleExceptions(error);
    }
  }

  findAll( paginationDto:PaginationDto) {

    const { limit= this.defaultLimit, offset = 0 } =  paginationDto;

    return this.pokemonModel.find() //``
          .limit(limit)
          .skip(offset)
          .sort ({
            no:1
          })
          .select('-__v') // Para que no aparesca  "__v": 0
  }

  async findOne(term: string) {
    
    let pokemon: Pokemon;

    if(!isNaN(+term)) {
       pokemon = await this.pokemonModel.findOne({ no:term });
    }

    // MongoID
    if(!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }

    // Name
    if (! pokemon ) {
      pokemon = await this.pokemonModel.findOne({ name: term.toLocaleLowerCase().trim() });
    }


    if( !pokemon )
     throw new NotFoundException(`Pokemon with id, name or no ${ term}  not found`);


    return pokemon;

  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    try {
      const pokemon = await this.findOne(term);
      if (updatePokemonDto.name)
        updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
      
      await pokemon.updateOne(updatePokemonDto);

      return {...pokemon.toJSON(), ...updatePokemonDto};
    } catch(error) {
      this.handleExceptions(error);
   }
  }

  async remove(id: string) {
    // Dos consultas a la bd
    //const pokemon = await this.findOne(id);
    //await pokemon.deleteOne();
    // Validar y eliminar en una sola consulta
    const { deletedCount } = await this.pokemonModel.deleteOne( {_id: id}); 
    if(deletedCount === 0) {
      throw new BadRequestException(`Pokemon with id ${id} not found`);
    }
    return;
  }



  private handleExceptions(error: any) {
    if(error.code === 11000) {
      throw new BadRequestException(`Pokemon exists in db ${ JSON.stringify( error.keyValue ) }`);
    } else {
      throw new InternalServerErrorException(`Can't update Pokemon - Check server logs`);
    }
  }
  
}
