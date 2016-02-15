app.factory('GrupoService',function($http,CONFIG,LocalService,CurrentUser){
  return {
    getGrupos:function(){
      console.log(CurrentUser.user().token);
      var grupos = $http.get(CONFIG.APIURL + "teachers/me/groups",{
        		headers: { 'Authorization': "Bearer " + CurrentUser.user().token}
   			});
   			grupos.success(function(data){

   			});
   			return grupos;
    }
  }
});
