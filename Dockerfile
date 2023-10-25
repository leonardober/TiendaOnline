#Indica que este dockerfile se basa en la imagen de docker llamada ngnix, significa que el contenedor utilizara la ultima version de la imagen
FROM nginx:latest

#esta linea copia el contenido del directorio local llamado proyecto para agregarlo al directorio predeterminado de la imagen dond en nginx busca los archivo y los recursos dpara mostrar en la web
COPY tiendaonline /usr/share/nginx/html/

#indicamos que el contenedor se estara desplegando  en el puerto 80.
EXPOSE 80

#comando global para ejecucion de nginx de manera global con el daemon visualizado no en segundo plano.
CMD ["nginx", "-g", "daemon off;" ]
