app.controller('ConfiguracionCtrl', function($scope, $timeout, $ionicLoading,LocalService, $ionicPopup, $state,CurrentUser,Auth,DataService) {
  $scope.usuario = {};
  $scope.currentUser = CurrentUser.user();
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
      $scope.persona = data;
      $scope.usuario = data.user;
    }).error(function(e){

    });
  }

  function getCarreras(){
    DataService.getCarreras().success(function(data){
      console.log(data);
      $scope.carreras = data
    }).error(function(e){

    });
  }

  getCarreras();

  $scope.logout = function(){
    Auth.logout();
    $state.go('index');
  }

  $scope.actualizarUsuario = function(u){
    console.log(u);
    CurrentUser.updateUsuario(u).success(function(data){
      $scope.showAlert('Exito',"Cuenta actualizada");
    }).error(function(e){
      $scope.showAlert('Error',"Tenemos un problema al actualizar");
    });
  }

  $scope.actualizarAlumno = function(a){
    console.log(a);
    CurrentUser.updateAlumno(a).success(function(data){
      $scope.showAlert('Exito',"Perfil actualizado");
    }).error(function(e){
      $scope.showAlert('Error',"Tenemos un problema al actualizar");
    });
  }

  $scope.actualizarMaestro = function(m){
    console.log(m);
    CurrentUser.updateMaestro(m).success(function(data){
      $scope.showAlert('Exito',"Perfil actualizado");
    }).error(function(e){
      $scope.showAlert('Error',"Tenemos un problema al actualizar");
    });
  }

  $scope.cambiarContrasena = function(usuario){
    console.log(usuario);
    CurrentUser.setInformacion(usuario).success(function(data){
      console.log(data);
    }).error(function(e){

    });
  }

  // if(CurrentUser.user().user.access_level === 0){
  //
  // }else{
  //   getInformacion();
  // }
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
