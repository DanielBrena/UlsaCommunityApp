angular.module('app.routes',[])
.config(function($stateProvider,$urlRouterProvider){

  $stateProvider
  .state('index',{
    url:'/',
    templateUrl:'templates/home.html'
  }).state('loginMaestro',{
    url:'/login',
    templateUrl:'templates/auth/login.html',
    controller:'LoginCtrl'
  });

  $stateProvider
    .state('maestro', {
    url: '/maestro',
    abstract: true,
    templateUrl: 'templates/menu.html'
  })

  .state('maestro.principal', {
    url: '/principal',
    views: {
      'menuContent': {
        templateUrl: 'templates/maestro/principal.html'
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
  }).state('maestro.grupo',{
    url:'/grupo/:id',
    views:{
      'menuContent':{
        templateUrl:'templates/maestro/grupo.html',
        controller:'EstudianteCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/');
});
