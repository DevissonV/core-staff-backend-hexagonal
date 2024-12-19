
# Documentación tecnica

## Estructura del proyecto en arquitectura hexagonal
```
┣ 📂src
┃ ┣ 📂application
┃ ┃ ┗ 📂use-cases
┃ ┃   ┣ 📂employees
┃ ┃   ┃ ┣ 📜create-employee.js
┃ ┃   ┃ ┣ 📜delete-employee.js
┃ ┃   ┃ ┣ 📜get-employee-by-id.js
┃ ┃   ┃ ┗ 📜update-employee.js
┃ ┃   ┣ 📂requests
┃ ┃   ┃ ┣ 📜create-request.js
┃ ┃   ┃ ┣ 📜delete-request.js
┃ ┃   ┃ ┣ 📜get-request-by-id.js
┃ ┃   ┃ ┗ 📜update-request.js
┃ ┃   ┗ 📂users
┃ ┃     ┣ 📜delete-user.js
┃ ┃     ┣ 📜login-user.js
┃ ┃     ┗ 📜register-user.js
┃ ┣ 📂domain
┃ ┃ ┣ 📂entities
┃ ┃ ┃ ┣ 📜employee.js
┃ ┃ ┃ ┣ 📜request.js
┃ ┃ ┃ ┗ 📜user.js
┃ ┃ ┣ 📂repositories
┃ ┃ ┃ ┣ 📜employee-repository.js
┃ ┃ ┃ ┣ 📜request-repository.js
┃ ┃ ┃ ┗ 📜user-repository.js
┃ ┃ ┗ 📂services
┃ ┃   ┣ 📜employee-service.js
┃ ┃   ┣ 📜request-service.js
┃ ┃   ┗ 📜user-service.js
┃ ┣ 📂infrastructure
┃ ┃ ┣ 📂config
┃ ┃ ┃ ┣ 📜envs.js
┃ ┃ ┃ ┗ 📜middlewares.js
┃ ┃ ┣ 📂database
┃ ┃ ┃ ┣ 📂migrations
┃ ┃ ┃ ┃ ┣ 📜20241205225059_create_employees_table.js
┃ ┃ ┃ ┃ ┣ 📜20241205225101_create_requests_table.js
┃ ┃ ┃ ┃ ┗ 📜20241206173037_create_users_table.js
┃ ┃ ┃ ┣ 📂repositories
┃ ┃ ┃ ┃ ┣ 📜knex-employee-repository.js
┃ ┃ ┃ ┃ ┣ 📜knex-request-repository.js
┃ ┃ ┃ ┃ ┗ 📜knex-user-repository.js
┃ ┃ ┃ ┣ 📂seeds
┃ ┃ ┃ ┗ 📜database.js
┃ ┃ ┗ 📜server.js
┃ ┣ 📂interfaces
┃ ┃ ┣ 📂controllers
┃ ┃ ┃ ┣ 📜employee-controller.js
┃ ┃ ┃ ┣ 📜request-controller.js
┃ ┃ ┃ ┗ 📜user-controller.js
┃ ┃ ┣ 📂middlewares
┃ ┃ ┃ ┗ 📜auth-middleware.js
┃ ┃ ┗ 📂routes
┃ ┃   ┣ 📜api-routes.js
┃ ┃   ┣ 📜employee-routes.js
┃ ┃   ┣ 📜request-routes.js
┃ ┃   ┗ 📜user-routes.js
┃ ┗ 📂utils
┃   ┣ 📂response
┃   ┃ ┗ 📜response.js
┃   ┗ 📂validations
┃     ┣ 📜employee-validation.js
┃     ┣ 📜pagination-validation.js
┃     ┗ 📜request-validation.js
┣ 📜.dockerignore
┣ 📜.env
┣ 📜.env-example
┣ 📜.gitignore
┣ 📜corestaff-collection.json
┣ 📜docker-compose.dev.yml
┣ 📜knexfile.js
┣ 📜package.json
┣ 📜pnpm-lock.yaml
┗ 📜README.md

```

## Requisitos previos

Antes de iniciar con la configuración del proyecto, asegúrate de cumplir con los siguientes requisitos:

  - Tener instalado Node.js en la versión 20 o superior
  - Tener una instancia activa de PostgreSQL en la versión 16.2. 
  - Copiar el archivo .env-example que se encuentra en la raíz del proyecto y renómbralo a .env
  - Ajusta los valores en el archivo .env de acuerdo a tu entorno, como los datos de conexión a la base de datos y otras variables importantes.

NOTA: Si se ejecutará con Docker, solo necesitas verificar que Docker esté instalado y modificar el archivo .env, ya que el proyecto configura automáticamente todo lo necesario para su ejecución.

## Instalación Backend
Para probar en local, (sin docker)

1. Instalar dependencias, ejecuta el siguiente comando para instalar todas las dependencias del proyecto:
```
pnpm install
```

2. Aplicar migraciones, Ejecuta este comando para crear las tablas necesarias en la base de datos mediante las migraciones:
``` 
pnpx knex migrate:latest
```

3. Iniciar el servidor, Puedes iniciar el servidor con cualquiera de los siguientes comandos:


Con Pnpm
```
pnpm dev
```
Con npm
```
 npm run dev  
```

## Levantar el proyecto con Docker

Si prefieres utilizar Docker para simplificar la ejecución del proyecto, sigue estos pasos:

### Requisitos previos
  - Tener Docker y Docker Compose(opcional) instalados en tu sistema.

### Pasos de ejecución

1. Construir la imagen, ejecuta el siguiente comando para construir la imagen del contenedor:
```
docker-compose -f docker-compose.dev.yml build
```
2. Levantar los contenedores 
```
docker-compose -f docker-compose.dev.yml up
```

## Crear nuevas tablas mediante migraciones
Si necesitas crear nuevas tablas, utiliza los siguientes comandos para generar los archivos de migración, ejemplo de las tablas existentes: 
```
pnpx knex migrate:make create_employees_table
pnpx knex migrate:make create_requests_table
pnpx knex migrate:make create_users_table
```
Estos comandos generarán archivos de migración en la carpeta correspondiente (migrations/), donde podrás definir la estructura de las tablas.


## Ejecución en Postman

Para facilitar la ejecución y prueba de las APIs en Postman:

  - En la raíz del proyecto hay un archivo llamado ```corestaff-collection.json```.
Importa este archivo en Postman para cargar todas las rutas y configuraciones del proyecto.
  - Ajusta las variables de entorno en Postman según tu configuración local o de Docker, variable ```{{URL}}```.