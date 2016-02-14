app.factory('Auth',function($http,CONFIG,LocalService){
  return {
    login:function(usuario){
      var login = $http.post(CONFIG.APIURL+'auth',usuario);
      login.success(function(data){
        LocalService.set('token_teacher',JSON.stringify(data));
      });
      return login;
    }
  }
});
