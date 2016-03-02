app.controller('DetalleEstudianteCtrl',function($scope,$stateParams,DetalleService){
  var idGrupo = $stateParams.grupo;
  $scope.estudiante = angular.fromJson($stateParams.estudiante);

  function cargarAsistencias(){
    DetalleService.getAsistencias($scope.estudiante.id,idGrupo).success(function(data){
      $scope.asistencias = data.student.assistances;
    }).error(function(e){

    });
  }

  cargarAsistencias();


  console.log(idGrupo);
  console.log($scope.estudiante);

});
