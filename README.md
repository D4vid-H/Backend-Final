# _Proyecto Backend API FULL REST ECOMMERCE_

## RESUMEN
El proyecto Backend es una api rest full, creada para ser contactada desde un frontend, el cual debe ser capaz de 
recibi, procesar y mostrar los datos enviados por el backend.

## INFORMACION
Nuestra API esta desarrollada en JavaScript y nuestro servidor esta desarrollado con [Node.js](https://nodejs.org/). 
Es una API de Ecommerce, con lo cual entre sus funciones estan: 
+ Crear productos
+ Modificar productos
+ Eliminar productos
+ Crear usuarios
+ Logear usuarios
+ Crear carrito de compra
+ Agregar productos al carrito
+ Eliminar productos del carrito
+ Vaciar carrito de compras

Los datos son almacenados en una base de datos en la nube, en este caso se eligio mongo atlas para el proyecto.

## INSTALACION
Para instalar la API se debe rescargar el proyecto alojado en github.
Una vez descargado el proyecto, desde la carpeta principal del proyecto, debemos correr en un CLI el siguiente comando
para instalar los paquetes necesario para correr la API.

```sh
npm install
```

Luego debemos iniciar el servidor con el siguiente comando desde el mismo CLI iniciado anteriormente. 

```sh
npm start
```

Una vez corriendo nuestro servidor podremos hacer pruebas coenctandonos a las siguientes rutas.

localhost:port (el port esta definido en un archivo .env que se describira mas abajo)

## CONFIGURACION DE ENTORNO
Para configurar nuestro entorno de ejecucion de nuestro servidor es necesario crear un archivo .env, 
donde se configuraran las conexiones necesarias para:
- Conectarnos a nuestra DB mongo atlas
- El puerto donde escucha peticiones el servidor
entre otros parametros.
Se expone un archivo .env a modo de ejemplo:

- PORT_DEVELOPER= (indicar el puerto donde escuchara peticiones el servidor en desarrollo)
- PORT_PRODUCTION= (indicar el puerto donde escuchara peticiones el servidor en produccion)
- connectDB= conexion a la DB de mongo atlas.
- DATABASE= seleccion de la DB que se utilizara. (en este caso solo contamos con la DB mongoose)
- SERVER_URL= La direccion a la cual podemos contactar al servidor para enviarles peticiones.
- SECRET= palabra secreta para codificar la infromacion en la cookie
- EMAIL= casilla de correo donde se informaria.
- MAIL_USER= cuenta de correo donde llegan los correo cuando se registra un nuevo usuario.
- MAIL_PASS= password del servidor de correo para enviar
- MAIL_SMTP= direccion del servidor de correo para enviar
- MAIL_PORT= puert del servidor de correo para enviar

ENDPOINTS DE LA API
Las siguientes direcciones estan configuradas con el proposito de devolver los datos a las que se hace referencia.
Las direcciones (endpoints):

>Para administrar los productos:
>Es necesario setear desde la DB en el user la propiedad "rol", 
>ya que por defecto se crean las cuentas como generic y se deben setear a admin.

Nuestros productos deben contener los siguientes parametros para ser admintidos en nuetra DB.

Ejemplo producto en JSON:
```sh
	{
      id: { type: Number, required: true }, (este campo se auto genera, no se debe enviar al crear un producto)
      name: { type: String, required: true },
      category: { type: String, required: false },
      picturUrl: { type: String, required: false },
      price: { type: Number, required: true },
      description: { type: String, required: true },
	}

```
	

Las rutas de productos:
+ localhost:port/product/add	- se envia a travez de un metodo post, con el producto a cargar.
+ localhost:port/product/list- se envia a travez de un metodo get, devuelve el listado de productos
+ localhost:port/product/	- se envia a travez de un metodo put, con el producto a modificar
+ localhost:port/product/	- se envia a travez de un metodo delete, con el producto a eliminar
+ localhost:port/product/add	- se envia a travez de un metodo get, devuelve una web para crear productos
+ localhost:port/product/	- se envia a travez de un metodo get, devuelve la lista de productos por categoria(se debe pasar por json la clave:valor {"category":"alguna"})
+ localhost:port/product/:id	- se envia a travez de un metodo get, muestra el producto con ese ID.

>Para registrarse y logearse:
>Se debe acceder a la ruta principal que simplemente redirecciona al loguin en la API.
>Los usuarios para registrarse deben contener los siguientes parametros para ser admintidos en nuetra DB.

Ejemplo user en JSON:
```sh
	{
      username: { type: String, required: true },
      password: { type: String, required: true },
      passwordConfirm: { type: String, required: true },
      avatar: { type: String, required: false }, (No implementado)
      address: { type: String, required: false },
      cellphone: { type: Number, required: false },
      name: { type: String, required: false },
      age: { type: Number, required: false },
      rol: { type: String, required: true },
	}

```
	

+ localhost:port/	-Ruta inicial de la API
+ localhost:port/loguin	-Ruta para realizar el login	
+ localhost:port/register -Ruta para realizar el registro
+ localhost:port/logout	-Ruta para realizar el deslogueo
+ localhost:port/home	-Ruta al home del usuario

>Para utilisar el carrito de compras:
>Se accede a traves de las siguientes rutas en la API.
>Los usuarios para utilizar el carrito de compras deben utilizar el siguiente formato.

Ejemplo user en JSON:

```sh
	{
	id: { type: Number, required: true },
	cant: { type: Number, required: true } 
	}
```
	

+ localhost:port/cart/		- se envia a travez de un metodo get, devuelve el listado de productos dentro del carrito.
+ localhost:port/cart/product	- se envia a travez de un metodo put, se cargara un producto al carrito, pasado por body con los parametros definidos en el ejemplo.		
+ localhost:port/cart/product	- se envia a travez de un metodo delete, se elimina un producto del carrito, pasado por body con el parametros definido en el ejemplo solo el id.

## IMPLEMENTACION DE FRONTEND
Se implementaron algunas vistas para el frontend con las cuales se pueden probar alfunas funcionalidades.

Las vistas implementadas son la siguientes:

+ Vista Login
+ Vista Registro
+ Vista Home
+ Vista Chat
+ Vista logout
+ Vista crear producto

## LIBRERIAS Y COMPLEMENTOS 

| Librerias | Complementos |
| ------ | ------ |
| bcrypt | Github |
| connect-mongo | Mongo Atlas |
| dotenv | NPM |
| ejs |  |
| express |  |
| express-session |  |
| method-override |  |
| mongoose |  |
| nodemailer |  |
| nodemon |  |
| passport |  |
| passport-local |  |
| socket.io |  |

