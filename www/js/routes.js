angular.module('app.routes',['app.levels'])
.config(function($stateProvider,$urlRouterProvider,AccessLevels){

  $stateProvider
  .state('index',{
    url:'/',
    templateUrl:'templates/home.html',
    controller:function($state,CurrentUser){
      if(CurrentUser.user()){
        $state.go('maestro.principal');
      }
    },
    data: {
          access: AccessLevels.anon
        }
  }).state('loginMaestro',{
    url:'/login',
    templateUrl:'templates/auth/login.html',
    controller:'LoginCtrl',
    data: {
          access: AccessLevels.anon
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
