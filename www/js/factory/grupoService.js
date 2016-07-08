app.factory('GrupoService',function($http,CONFIG,LocalService,CurrentUser){
  return {
    getGrupo:function(id){
      var resultado = $http.get(CONFIG.APIURL + "groups/"+id);
      return resultado;
    },

    getGrupos:function(){
      console.log(CurrentUser.user().token);
      var grupos = $http.get(CONFIG.APIURL + "teachers/me",{
   			});
   			grupos.success(function(data){

   			});
   			return grupos;
    },
    addAlumno:function(grupo){
      var resultado = $http.post(CONFIG.APIURL + "groups/addStudent",grupo);
      return resultado;
    },
    removeAlumno:function(grupo){
      var resultado = $http.post(CONFIG.APIURL + "groups/removeStudent",grupo);
      return resultado;
    },
    getGruposAlumno:function(){
      var resultado = $http.get(CONFIG.APIURL + "students/me");
   		return resultado;
    },
    getGruposActivos:function(){
      var resultado = $http.get(CONFIG.APIURL + "groups/findGroupsActive");
      return resultado;
    }
  }
});
