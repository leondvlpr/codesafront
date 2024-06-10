# CRUD FRONT

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.6.

## Servidor de desarrollo

Inicialmente ejecuta `npm install` para instalar las dependenciass del proyecto.

Seguidamente Ejecuta `ng serve` para iniciar un servidor de desarrollo. Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si cambias alguno de los archivos fuente.

## Funcionamiento

El proyecto consta de las siguientes acciones:

## GET

### FACTURA (INVOICE)
Para obtener todas las facturas creadas (invoices) se realiza una petición GET a la ruta `/api/invoice`. La respuesta retornará un array de objetos JSON con los datos de las facturas creadas.

### RECURSO (RESOURCE)
Para obtener todos los recursos (resources) creados que se deseen relacionar en la factura se realiza una petición GET a la ruta `/api/resources`.

## POST

### FACTURA (INVOICE)
-Para crear una invoice se realiza una petición POST a la ruta `/api/invoice/create`, este recibe el body en formato JSON con las keys necesarias para crear una factura.

-Para actualizar una invoice se realiza una petición POST a la ruta `/api/invoice/update`, este recibe el body en formato JSON con las keys necesarias para actualizar una factura.

### RECURSO (RESOURCE)
-Para crear un recurso se realiza una petición POST a la ruta `/api/resources/create`, este recibe el body en formato JSON con las keys necesarias para crear un recurso.

## DELETE

### FACTURA (INVOICE)
-Para eliminar una invoice se realiza una petición DELETE a la ruta `/api/invoice/delete/{id}`, donde `{id}` es el id de la invoice que se desea eliminar.

### NOTIFICACIONES
-Las respuestas de los diferentes endpoints se pintan en la vista de usuario por medio de un componente de notificaciones de la librería primeNG.
