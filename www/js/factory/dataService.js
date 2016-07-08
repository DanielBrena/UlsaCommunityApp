app.factory('DataService',function($http,CONFIG){
  return{
    getCarreras:function(){
      var resultado = $http.get(CONFIG.APIURL + "careers");
      return resultado;
    }
  }
});
