app.factory('DetalleGrupoService',function($http,CONFIG,LocalService,CurrentUser){
  return {
    getEstudiantes:function(id){
      var estudiantes = $http.get(CONFIG.APIURL + "groups/" + id ,{
        	// headers: { 'Authorization': "Bearer " + CurrentUser.user().token}
      }).success(function(data){

      });

      return estudiantes;
    },
    getAsistencias:function(grupo,tipo){
      var asistencias = $http.get(CONFIG.APIURL + "assistances/" + grupo + "/type/" + tipo);
      return asistencias;
    },
    setAsistencia:function(data){
      var estudiantes = $http.post(CONFIG.APIURL + "assistances/createAll/",data,{
        	// headers: { 'Authorization': "Bearer " + CurrentUser.user().token}
      }).success(function(data){

      });
      return estudiantes;
    },
    checarAsistencias:function(id){
      var estudiantes = $http.get(CONFIG.APIURL + "assistances/check/" + id ,{
      }).success(function(data){

      });
      return estudiantes;
    }
  }
});
