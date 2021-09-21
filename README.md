# ExamenWEB

Proyecto de tipo WEB para uso de pruebas de dominio publico, utilizado para la administración de contactos, con una pequeña capa de seguridad aplicando JWT, tambien separa el 
componente principal que es de tipo publico ya que en este no es necesario iniciar sesión para poder visualizarlo. Para ello se utilizo rutas que estas a su vez cargan a
un modulo separado del inicial debido a que en este se contendra todo lo que sea privado. Tambien se utilizo guards el metodo canActivate que valida que exista un token
dentro del "localStorage" para asi permitir al usuario ingresar o no a ciertos componentes al momento de ejecutar la aplicación.

Para los llamados a la API, se utilizan servicios que contienen funciones con los metodos comunes de un CRUD. Ante cada petición se utilizo un Interceptor que a su vez este
manda llamar al archivo "enviroment" ya que dentro se encuentra la ruta hacia la API, debido a esto hay que modificarse en caso que la URL de la API sea distinta.

Para el diseño se utilizo Bootstrap y para la interaccion del mismo jQuery y Popper.js, ya que son librerias necesarias para la utilización de modals y tablas, que por cierto,
se hace uso de DataTable un plugin para desplegar tablas de lado visual HTML que a su vez cuentan ya con paginado y busquedas.

Angular CLI 12.1.2.
Bootstrap 5.1
jQuery 3.6.0
Popper.js 1.16.1
DataTable 1.11.2


Autor: Pedro Pablo Soto
Email: pedro_pablo@live.com.mx

