ULSACOMMUNITY APP
=====================

ULSACOMMUNITY APP es una aplicación móvil con el framework IONIC.
Su desarrollo fue para la Universidad La Salle Oaxaca para la área de FIBU.

## Caracteristicas
- Visualización de eventos.
- Visualización de noticias.
- Visualización de grupos.
- Visualización de calificaciones.
- Visualización de asistencias.
- Notificaciones de eventos.
- Configuración de perfil.

## Requerimientos
- Nodejs
- Ionic
- Android Studio (OSx, Linux, Windows)
- XCode (Mac)


## Instalación


###### Instalar NodeJS.
###### Instalar Ionic a traves de npm.

Para correr la aplicación se necesita correr ULSACOMMUNITY SERVER y agregar la url
dentro del aplicativo del servidor.

```javascript
io.sails.url = "http://localhost:1337";
io.sails.useCORSRouteToGetCookie = false;
app.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});
app.constant('CONFIG',
  {
  "APIURL":"http://localhost:1337/",
    anon: 0,
    user: 1
  }
)
```
## Compilar
###### iOS
```bash
ionic platform add ios
ionic build ios
```

###### Android
```bash
ionic platform add android
ionic build android
```
