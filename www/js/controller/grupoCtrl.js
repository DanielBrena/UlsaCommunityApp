app.controller('GrupoCtrl',function($scope,GrupoService,$ionicPopup,$state){

  function cargarGrupos(){
    GrupoService.getGrupos().success(function(data){
      $scope.grupos = data.teacher.groups;
      console.log(data.teacher);
      console.log(data.teacher.groups);
    }).error(function(e){

    });
  }
  cargarGrupos();

  $scope.accederAGrupo = function(id){
    console.log(id);
    $state.go("maestro.grupo",{
					id:id
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
