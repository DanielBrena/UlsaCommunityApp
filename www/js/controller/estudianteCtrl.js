app.controller('EstudianteCtrl',function($scope,$stateParams,EstudianteService){
  var idGrupo = $stateParams.grupo;

  $scope.estudiante = angular.fromJson($stateParams.estudiante);

  function cargarAsistencias(){
    EstudianteService.getAsistencias($scope.estudiante.id,idGrupo).success(function(data){
      console.log(data);
      $scope.asistencias = data.assistances;
      $scope.asistenciasCount = _.groupBy(data.assistances,function(asistencia){
        if(asistencia.type2 == 'asistencia'){
          return asistencia.type;
        }
      });
      if($scope.asistenciasCount.true ){
        cargarCalificacion($scope.asistenciasCount.true.length);
      }
    }).error(function(e){

    });
  }

  cargarAsistencias();

  function cargarCalificacion(asistencias){
    EstudianteService.getCalificacion(asistencias).success(function(data){
      $scope.asistenciasCount.calificacion = data;
    }).error(function(e){

    });
  }


  console.log(idGrupo);
  console.log($scope.estudiante);

});
