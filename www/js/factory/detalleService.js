app.factory('DetalleService',function($http,CONFIG,LocalService,CurrentUser){
  return {
    getAsistencias:function(idStudent,idGroup){
      var asistencias = $http.get(CONFIG.APIURL + "students/"+idStudent +"/groups/" + idGroup + "/assistances",{
        	// headers: { 'Authorization': "Bearer " + CurrentUser.user().token}
      }).success(function(data){

      });

      return asistencias;
    }
  }
});
