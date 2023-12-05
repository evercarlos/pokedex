import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose"; // mongo

@Schema()
export class Pokemon extends Document {

    // id: string // Mongo me lo da

    @Prop({ // prop: de propiedad
        unique: true,
        index: true // indice= igual que en la busca en una biblioteca por indice, es mas rápido
    })
    name: string;

    @Prop({
        unique: true,
        index: true 
    })
    no: number;

}


export const PokemonSchema = SchemaFactory.createForClass(Pokemon);