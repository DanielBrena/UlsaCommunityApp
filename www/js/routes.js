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
  });

  $urlRouterProvider.otherwise('/');
});
