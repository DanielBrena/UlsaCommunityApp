app.controller('LoginCtrl',function($scope,Auth,$ionicPopup,$state,$ionicLoading){
  $scope.login = function(usuario){

    $ionicLoading.show({
      content: 'Cargando grupos..',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

    Auth.login(usuario).success(function(data){
      console.log(data);
      $ionicLoading.hide();
      $state.go("maestro.principal");
    }).error(function(e){
      console.log(e);
      $ionicLoading.hide();
      $scope.showAlert(e.message,e.errors[0].message);
    });
  }




  $scope.showAlert = function(title,msg) {
	   var alertPopup = $ionicPopup.alert({
	     title: title,
	     template: msg
	   });
	   alertPopup.then(function(res) {
	     console.log('Open alert');
	   });
	 };

});
