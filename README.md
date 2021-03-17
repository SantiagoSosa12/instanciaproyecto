# Esta es la instancia del proyecto la cual funciona de manera que un cliente en android  registra los datos para vacunarse a saber: Nombre, Ciudad, Foto de la cedula
#Se conecta a una maquina la cual redirige su peticion a x de los dos servidores segun su turno, Luego x servidor recibe la peticion y se conecta a una base de datos remota que #guarda los datos. La imagen enviada se guarda en un servicio aparte, el monitoreo de x servidor se hace con un servicio a parte
#Las tecnologias implemetadas en cada componente son:

#Middleware: Nginx Redirije la carga a uno de los dos servidores

#Instancia 1 y 2 Se utiliza NodeJS EndPoint para recibir la peticion de los usuarios

#Servidor de base de datos: MongoDB Se almacena los datos del paciente: Nombre, Ciudad, Ruta que provee Clodinary al alamcenar una foto (Foto cedula)

#PM2 Se utiliza para gestionar los procesos de servidores 1 y 2, Podemos acceder a su sitio Web mediante una cuenta para monitorizar sichos servicios

#Cloudinary Servicio web que utilizan Servidores 1 y 2 para almacenar las imagenes que lleguen.

![Despliegue](https://user-images.githubusercontent.com/38636157/111420552-6feff280-86b9-11eb-8656-c78be1a36ad1.png)
