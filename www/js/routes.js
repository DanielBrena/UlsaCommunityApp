angular.module('app.routes',['app.levels'])
.config(function($stateProvider,$urlRouterProvider,AccessLevels){

  $stateProvider
  .state('index',{
    url:'/',
    templateUrl:'templates/home.html',
    controller:function($state,CurrentUser,$state){
      $state.go('index');
      if(CurrentUser.user() != null){
        if(CurrentUser.user().user.access_level == 0){
          $state.go('alumno.principal');
        }else{
          $state.go('maestro.principal');
        }
      }
      // if(CurrentUser.user().user.access_level == 0){
      //   $state.go('alumno.principal');
      // }else{
      //   $state.go('maestro.principal');
      // }
    },
    data: {
          access: AccessLevels.anon
        }
  }).state('login',{
    url:'/login',
    templateUrl:'templates/auth/login.html',
    controller:'LoginCtrl',
    data: {
          access: AccessLevels.anon
        }

  }).state('loginAlumno',{
    url:'/loginAlumno',
    templateUrl:'templates/auth/loginAlumno.html',
    controller:'LoginCtrl',
    data: {
          access: AccessLevels.anon
        }

  });

  $stateProvider
    .state('alumno',{
    url: "/alumno",
    abstract: true,
    templateUrl: "templates/alumno/tabs.html",
    data: {
          access: AccessLevels.anon
        }

  }).state('alumno.principal',{
    url: "/principal",
    views: {
      'tab-principal': {
        templateUrl: 'templates/alumno/principal.html',
        controller:'PrincipalUCtrl'
      }
    }
  }).state('alumno.grupos',{
    url: "/grupos",
    views: {
      'tab-grupo': {
        templateUrl: 'templates/alumno/grupos.html',
        controller:'GrupoUCtrl'
      }
    }
  }).state('alumno.detalleGrupo',{
    url: "/grupos/:id/:alumno",
    views: {
      'tab-grupo': {
        templateUrl: 'templates/alumno/detalleGrupo.html',
        controller:'DetalleGrupoUCtrl'
      }
    }
  }).state('alumno.configuracion',{
    url: "/configuracion",
    views: {
      'tab-configuracion': {
        templateUrl: 'templates/maestro/configuracion.html',
        controller:'ConfiguracionCtrl'
      }
    }
  }).state('alumno.editarCuenta',{
    url: "/cuenta",
    views: {
      'tab-configuracion': {
        templateUrl: 'templates/maestro/editarCuenta.html',
        controller:'ConfiguracionCtrl'
      }
    }
  }).state('alumno.editarAlumno',{
    url: "/alumno",
    views: {
      'tab-configuracion': {
        templateUrl: 'templates/alumno/editarAlumno.html',
        controller:'ConfiguracionCtrl'
      }
    }
  });

  $stateProvider
    .state('maestro', {
    url: '/maestro',
    abstract: true,
    templateUrl: 'templates/menu.html',
    data: {
          access: AccessLevels.user
        },
    controller:function($scope,Auth,$state){
        $scope.logout = function(){
          Auth.logout();
          $state.go('index');
        }
    }
  }).state('maestro.principal', {
    url: '/principal',
    views: {
      'menuContent': {
        templateUrl: 'templates/maestro/principal.html',
        controller:'PrincipalCtrl'
      }
    }
  }).state('maestro.publicacion', {
    url: '/publicaciones',
    views: {
      'menuContent': {
        templateUrl: 'templates/maestro/publicacion.html',
        controller:'PublicacionCtrl'
      }
    }
  }).state('maestro.grupos',{
    url:'/grupos',
    views:{
      'menuContent':{
        templateUrl:'templates/maestro/grupos.html',
        controller:'GrupoCtrl'
      }
    }
  }).state('maestro.configuracion',{
    url:'/configuracion',
    views:{
      'menuContent':{
        templateUrl:'templates/maestro/configuracion.html',
        controller:'ConfiguracionCtrl'
      }
    }
  }).state('maestro.editarCuenta',{
    url:'/cuenta',
    views:{
      'menuContent':{
        templateUrl:'templates/maestro/editarCuenta.html',
        controller:'ConfiguracionCtrl'
      }
    }
  }).state('maestro.maestro',{
    url:'/maestro',
    views:{
      'menuContent':{
        templateUrl:'templates/maestro/editarMaestro.html',
        controller:'ConfiguracionCtrl'
      }
    }
  }).state('maestro.grupo',{
    url:'/grupo/:id',
    views:{
      'menuContent':{
        templateUrl:'templates/maestro/grupo.html',
        controller:'DetalleGrupoCtrl'
      }
    }
  }).state('maestro.estadistica',{
    url:'/grupo/:id/estadisticas',
    views:{
      'menuContent':{
        templateUrl:'templates/maestro/estadisticaGrupo.html',
        controller:'EstadisticaGrupoCtrl'
      }
    }
  }).state('maestro.estudiante',{
    url:'/grupo/:estudiante/:grupo',
    views:{
      'menuContent':{
        templateUrl:'templates/maestro/detalleEstudiante.html',
        controller:'EstudianteCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/');
});
