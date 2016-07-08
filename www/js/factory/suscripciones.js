app.factory('SuscripcionesFactory',function($http,CONFIG){
  return{
    suscripcionEventos:function(usuario,callback){

      var suscripcion = io.socket.post('/events/suscription', usuario,callback);
      
      console.log(suscripcion);
      return callback;
    }
  }
});
