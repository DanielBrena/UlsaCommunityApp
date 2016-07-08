// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('app', ['ionic','app.routes','app.levels','ionic-letter-avatar','chart.js','ngCordova'])

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
.run(function($ionicPlatform,$rootScope, $state, Auth) {

  $ionicPlatform.ready(function() {


    // var push = new Ionic.Push({
    //   "debug": false
    // });

    // push.register(function(token) {
    //   console.log("Device token:",token.token);
    //   push.saveToken(token);  // persist the token in the Ionic Platform
    // });

    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    $rootScope.$on('$cordovaLocalNotification:schedule',
			function (event, notification, state) {
				console.log("SCHEDULE");
				console.log('event', event);
				console.log('notification', notification);
				console.log('state', state);
			});

		$rootScope.$on('$cordovaLocalNotification:trigger',
			function (event, notification, state) {
				console.log("TRIGGER");
				console.log('event', event);
				console.log('notification', notification);
				console.log('state', state);
			});

		$rootScope.$on('$cordovaLocalNotification:update',
			function (event, notification, state) {
				console.log('UPDATE');
				console.log('event', event);
				console.log('notification', notification);
				console.log('state', state);
			});

		$rootScope.$on('$cordovaLocalNotification:cancel',
			function (event, notification, state) {
				console.log('CANCEL');
				console.log('event', event);
				console.log('notification', notification);
				console.log('state', state);
			});

  });
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    if (!Auth.authorize(toState.data.access)) {
      event.preventDefault();

      $state.go('index');
    }
  });



})
