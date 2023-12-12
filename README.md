<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

### Para la carpta publica(archivos estaticos)
- Instalar: npm i @nestjs/serve-static
### Axios
npm install axios@0.27.2 (Usamos esta versión por el error "cannot read properties of undefined")

# Ejecutar en desarro
1. clonar el repositorio
2. Ejecutar
```
npm install
```
3. Tener Nest CLI instalador
```
npm i -g @nest/cli
```
4. Levantar la base de datos
```
docker-compose up -d

5. Clonar el archivo ```__.env.template__``` y renombrar la copia a __.
env__

6. LLenar las variables de entorno definidas en el ```.env```

7. Ejecutar la aplicación en dev:
npm run start:dev

```
8. Reenconstruir la base de datos con la semilla (seed)
```
http://localhost:3000/api/v2/seed
```

### Stack usado
* MongoDB
* Nest
* https://pokeapi.co

#### COMANDOS NESTJS ####
* Crear un pipe
- nest g pi common/pipes/parseMongoId --no-spec
* Crear un seed 
- nest g res seed --no-spec
* Para variables de entorno
npm i @nestjs/config
* Para validar lanzar erroes y que unobjeto luzca de los esperando
* En este caso usaremos para nuestras variables de entorno
- npm in joi