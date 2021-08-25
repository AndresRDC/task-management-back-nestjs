# Gestor de tareas - backend 📝

Backend de gestor de tareas con la finalidad realizar practica del frontend con React, haciendo uso NestJS (con Express) TypeScript, ORM TypeORM, base de datos PostgreSQL y documentación con Swagger. Puedes ver la documentación [aquí](https://task-app-back.herokuapp.com/)

Si te interesan las tecnologías utilizadas, puedes visitar este otro proyecto más avanzado de cual participe de forma colaborativa [Healthy-Dev backend](https://github.com/Healthy-Dev/healthy-back)

## Configuración

En caso de prueba local crear archivo .env con el siguiente contenido, caso contrario agregar variables de entorno

```
TYPEORM_HOST={{host}}
TYPEORM_CONNECTION=postgres
TYPEORM_USERNAME= {{username de la db}}
TYPEORM_PASSWORD= {{password de la db}}
TYPEORM_DATABASE= {{nombre de la db}}
TYPEORM_PORT= {{puerto de la db}}
TYPEORM_SYNCHRONIZE=false
TYPEORM_MIGRATIONS_RUN=true
TYPEORM_ENTITIES=src/**/*.entity.ts
TYPEORM_MIGRATIONS=src/migrations/*.ts
TYPEORM_MIGRATIONS_DIR=src/migrations
TYPEORM_LOGGING=true
TYPEORM_LOGGER='file'
JWT_SECRET_KEY={{Texto de seguridad para desencriptar el token}}
JWT_EXPIRES={{Tiempo que expira el token}}
PORT={{Puerto}}
```

Puedes saber más al respecto de la configuración de TypeORM ver [aquí](https://typeorm.io/#/using-ormconfig)

## Instalación

```tsx
$ npm install
```

## Iniciando la aplicación web

```
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Documentación

[Link a la documentación](https://task-app-back.herokuapp.com/)
