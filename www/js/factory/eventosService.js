app.factory('EventosService',function($http,CONFIG,LocalService,CurrentUser,$q){
  return {
    getEventos:function(){
      var resultado = $http.get(CONFIG.APIURL + "events?sort=createdAt%20DESC");
      return resultado;
    },
    getEventosFilter:function(groups,diffusion){
      var resultado = $http.get(CONFIG.APIURL +"events/getEventos/"+diffusion + "/"+groups);
      return resultado;
    }
  }
});
