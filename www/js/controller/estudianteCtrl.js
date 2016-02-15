app.controller('EstudianteCtrl',function($scope,$stateParams,EstudianteService){
  var id = $stateParams.id;

  function cargarAlumnos(){
    EstudianteService.getEstudiantes(id).success(function(data){
      console.log(data);
      $scope.alumnos = data.group.students;
    }).error(function(e){

    });
  }

  cargarAlumnos();
});
