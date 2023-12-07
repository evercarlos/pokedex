import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name) //name: del document
    private readonly pokemonModel : Model<Pokemon>
  ) {}

  
  /*async executedSeed() {

    const { data } = await this.axios.get<PokeResponse>(' https://pokeapi.co/api/v2/pokemon?limit=20');

    data.results.forEach(async ({ name, url}) => {

      const segments = url.split('/');
      const no = +segments[segments.length -2]; // +: Para number
      
     const pokemon = await this.pokemonModel.create( {name, no} );

    });

    return 'Seed Executed';
  }
  */

  // Refactorizando codigo: evitando uso de await dentro de foreach. METODO 1
  /* async executedSeed() {

    await this.pokemonModel.deleteMany({});

    const { data } = await this.axios.get<PokeResponse>(' https://pokeapi.co/api/v2/pokemon?limit=20');

    const insertPromiseArray = [];

    data.results.forEach(async ({ name, url}) => {

      const segments = url.split('/');
      const no = +segments[segments.length -2]; // +: Para number
      
      insertPromiseArray.push(
        this.pokemonModel.create({name, no})
      )

    });

    await Promise.all(insertPromiseArray);

    return 'Seed Executed';
  }*/
  // Refactorizando codigo: evitando uso de await dentro de foreach. METODO 2
  async executedSeed() {

    await this.pokemonModel.deleteMany({});

    const { data } = await this.axios.get<PokeResponse>(' https://pokeapi.co/api/v2/pokemon?limit=650');

    const pokemonToInsert: {name: string, no:number}[] = [];

    data.results.forEach(async ({ name, url}) => {

      const segments = url.split('/');
      const no = +segments[segments.length -2]; // +: Para number
      
      pokemonToInsert.push({name, no});

    });

    await this.pokemonModel.insertMany(pokemonToInsert); // OPTIMO

    return 'Seed Executed';
  }


}
