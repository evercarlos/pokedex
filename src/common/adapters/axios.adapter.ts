import axios, { AxiosInstance } from "axios";
import { Injectable } from "@nestjs/common";

import { HttpAdapter } from "../interfaces/http-adapter.interface";

// Adapter: en node estan a nivel de modulo

@Injectable() // para inyectarlo
export class AxiosAdapter implements HttpAdapter {

    private  axios: AxiosInstance = axios;

    async get<T>(url: string): Promise<T> {
       try {

        const { data } = await this.axios.get<T>(url);
        return data;

       } catch(error) {
          
          throw new Error('Error in axios -> get');
       }
    }

}