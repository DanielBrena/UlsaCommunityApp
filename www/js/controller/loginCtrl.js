app.controller('LoginCtrl',function($scope,Auth,$ionicPopup,$state){
  $scope.login = function(usuario){
    Auth.login(usuario).success(function(data){
      console.log(data);
      $state.go("maestro.principal");
    }).error(function(e){
      console.log(e);
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
