app.factory('EstudianteService',function($http,CONFIG,LocalService,CurrentUser){
  return {
    getEstudiantes:function(id){
      var estudiantes = $http.get(CONFIG.APIURL + "teachers/me/groups/" + id + "/students",{
        	headers: { 'Authorization': "Bearer " + CurrentUser.user().token}
      }).success(function(data){

      });

      return estudiantes;
    }
  }
});
