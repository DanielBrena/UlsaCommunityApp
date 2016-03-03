app.controller('ConfiguracionCtrl', function($scope, $timeout, $ionicLoading,LocalService, $ionicPopup, $state,CurrentUser) {

  $scope.guardar = function(usuario){
      console.log("guardado");
      usuario.idUser = angular.fromJson(LocalService.get('token_teacher')).user.id;
    //  usuario.param = angular.fromJson(LocalService.get('token_teacher')).user.id;
      console.log(usuario.idUser);
      CurrentUser.setInformacion(usuario).success(function(data){
        console.log(data);
      }).error(function(e){
        console.log(e);
      });
  }

  function getInformacion(){
    CurrentUser.getInformacion().success(function(data){
      console.log(data);
      $scope.user = data.teacher.user;
    }).error(function(e){

    });
  }

  $scope.cambiarContrasena = function(usuario){
    console.log(usuario);
    CurrentUser.setInformacion(usuario).success(function(data){
      console.log(data);
    }).error(function(e){
      
    });
  }

  getInformacion();

  $scope.showAlert = function(title, msg) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: msg
    });
    alertPopup.then(function(res) {
      console.log('Open alert');
    });
  };

});
