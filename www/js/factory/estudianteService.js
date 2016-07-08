app.factory('EstudianteService',function($http,CONFIG,LocalService,CurrentUser){
  return {
    getAsistencias:function(idStudent,idGroup){
      var asistencias = $http.get(CONFIG.APIURL + "students/"+idStudent +"/assistancesByGroup/" + idGroup);
      return asistencias;
    },
    getCalificacion:function(asistencias){
      var asistencias = $http.get(CONFIG.APIURL + "tablequalification/getQualification/"+asistencias);
      return asistencias;
    }
  }
});
