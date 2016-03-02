app.factory('Auth',  function($http, LocalService,AccessLevels,CONFIG) {
  return {
    authorize: function(access) {
      if (access === AccessLevels.user) {
        return this.isAuthenticated();
      } else {
        return true;
      }
    },
    isAuthenticated: function() {
      return LocalService.get('token_teacher');
    },
    login: function(usuario) {
      var login = $http.post(CONFIG.APIURL + 'auth', usuario);
      login.success(function(data) {
        LocalService.set('token_teacher', JSON.stringify(data));
      });
      return login;
    },
    logout:function(){
			LocalService.unset("token_teacher");
      LocalService.removeAll();
    
		}
  }
}).factory('AuthInterceptor', function($injector, $q) {
  var LocalService = $injector.get('LocalService');
  return {
    request: function(config) {
      var token;
      if (LocalService.get('token_teacher')) {
        token = angular.fromJson(LocalService.get('token_teacher')).token;
      }
      if (token) {
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    },
    responseError: function(response) {
      if (response.status === 401 || response.status === 403) {
        LocalService.unset('token_teacher');
        $injector.get('$state').go('index');
      }
      return $q.reject(response);

    }
  }

}).config(function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
});
