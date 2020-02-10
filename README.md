# Proyecto1 Telematica
- Luis Javier Palacio Mesa

2. ¿CUALES SON LOS REQUISITOS FUNCIONALES DE LA APP?
- El sistema permitirá a los usuarios autorizados visualizar los datos recogidos por sus dispositivos.
- El sistema permitirá al usuario actualizar los datos que está visualizando de sus dispositivos.
- El sistema permitirá al usuario registrarse y guardará su nombre de usuario, contraseña, su nombre y su email.
- El sistema validará que todos los campos en el formulario de registro sean ingresados antes de crear un usuario.
- El  campo del nombre de usuario aceptará únicamente caracteres alfanuméricos
- El sistema validará que el campo del correo sea efectivamente un correo.
- El sistema permitirá al usuario ingresar sus credenciales usuario y contraseña para autenticarse e ingresar a la aplicación web.
- El sistema permitirá al usuario cerrar su sesión.
- El sistema permitirá ingresar nuevos datos  de temperatura, humedad y gps a dispositivos que estén autorizados para ello.

3. ¿CUALES SON LOS REQUISITOS NO FUNCIONALES DE LA APP?
- Toda funcionalidad del sistema y transacción de negocio debe responder al usuario en menos de 5 segundos.
- Las contraseñas deben ser encriptadas para mayor seguridad.
- El tiempo de aprendizaje del sistema por un usuario deberá ser menor a 10 minutos.
- El sistema debe proporcionar mensajes de error que sean informativos y orientados a usuario final.
- El sistema debe protegerse ante NOSQL o SQL injection rechazando el 100% de las peticiones maliciosas que usan estas tácticas..
- La comunicación entre el cliente y el servidor se deberá dar usando JWT, de modo que para acceder a los servicios es necesario un token de acceso proporcionado por el servidor.
- Los token de acceso proporcionados por el servidor deberán expirar en 5 minutos como medida de seguridad para garantizar la confidencialidad de los datos.
- Solo se recibirán peticiones para agregar datos de los dispositivos que conozcan una clave secreta (api-key)  que coincida con la que tiene el servidor.

¿QUÉ TECNOLOGÍA DE DESARROLLO UTILIZÓ?

4.1 EN EL BACKEND?
En la parte del back-end se usó express js, y para la base de datos se usó MongoDB

4.2 EN EL FRONTEND?
En la parte del front-end se usó Angular.

5. ¿CUALES SON Y CUAL ES LA ESPECIFICACIÓN DE LOS SERVICIOS API REST DEL BACKEND?

- Agregar nuevos datos:
  - Url: http://localhost:3000/api/data
  - Método: Post
  - Authorization: Agregar en el encabezado de la petición con la clave “api-key” el token de acceso para agregar datos.
  - Datos en el body:
  ```javascript
  {
    "temperature":Float,
    "humidity":Float,
    "geolocation":{
      "location": {
          "lat": Float,
          "lng": Float
      },
      "accuracy": Float
    },
    "user": String			 
  }
  ```
- Obtener los datos:
  - Url: http://localhost:3000/api/data
  - Método: Get
  - Authorization: Agregar en el encabezado de la petición con la clave “access-token” el json web token que se la ha dado luego de iniciar sesión.

- Inicio de sesión:
  - Url: http://localhost:3000/api/login
  - Método: Post
  - Authorization: Sin autorización.
  - Datos en el body:
  ```javascript
  {
    "username": String,
    "password": String,
  }
  ```
- Registrar usuario:
  - Url: http://localhost:3000/api/user
  - Método: Post
  - Authorization: Agregar en el encabezado de la petición con la clave “access-token” el json web token que se la ha dado luego de iniciar sesión.
  - Datos en el body:
  ```javascript
  {
    "username": String,
    "password": String,
    "name": String,
    "email": String	
  }
  ```
6. ¿CÓMO REALIZÓ LA AUTENTICACIÓN DE LOS SERVICIOS API REST?
En la parte del cliente se usó JSON Web Token como mecanismo de autenticación. Se usó el local storage del navegador para guardar el token, y se elimina de este cuando ya no es necesario. El JSON Web Token es generado por el backend cuando un usuario inicia sesión con el fin de autenticarlo y permitirle acceder al servicio que muestra la información recolectada.  Para mayor seguridad el token debe tener un tiempo de vida de 5 minutos. <br>
Por último, solo se permite agregar datos de los dispositivos que conozcan una clave secreta (api-key)  que coincida con la que tiene el servidor.


Luis Javier Palacio Mesa
Universidad EAFIT - 2020-I
