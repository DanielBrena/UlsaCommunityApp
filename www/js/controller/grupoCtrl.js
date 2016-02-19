app.controller('GrupoCtrl', function($scope, $timeout, $ionicLoading, GrupoService, $ionicPopup, $state) {

  function cargarGrupos() {
    $ionicLoading.show({
      content: 'Cargando grupos..',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

    GrupoService.getGrupos().success(function(data) {
      $scope.grupos = data.teacher.groups;
      $ionicLoading.hide();
      console.log(data.teacher);
      console.log(data.teacher.groups);
    }).error(function(e) {

    });

    $timeout(function() {$ionicLoading.hide();}, 1000);




  }
  cargarGrupos();

  $scope.accederAGrupo = function(id) {
    console.log(id);
    $state.go("maestro.grupo", {
      id: id
    });
  }


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
