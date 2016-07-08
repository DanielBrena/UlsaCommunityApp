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
      if(LocalService.get('token_teacher')){
        return LocalService.get('token_teacher');
      }else{
        return LocalService.get('token_student');
      }

    },
    login: function(usuario) {
      var login = $http.post(CONFIG.APIURL + 'auth', usuario);
      login.success(function(data) {
        console.log(data);
        if(data.user.access_level == 0){
          LocalService.set('token_student', JSON.stringify(data));
        }else{
          LocalService.set('token_teacher', JSON.stringify(data));
        }
      });
      return login;
    },
    logout:function(){
			LocalService.unset("token_teacher");
      LocalService.unset("token_student");
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
      }else if(LocalService.get('token_student')){
        token = angular.fromJson(LocalService.get('token_student')).token;
      }
      
      if (token) {
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    },
    responseError: function(response) {
      if (response.status === 401 || response.status === 403) {
        LocalService.unset('token_teacher');
        LocalService.unset('token_student');
        $injector.get('$state').go('index');
      }
      return $q.reject(response);

    }
  }

}).config(function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
});
