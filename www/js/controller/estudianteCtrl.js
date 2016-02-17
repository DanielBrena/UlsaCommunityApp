app.controller('EstudianteCtrl', function($scope, $stateParams,$timeout,$ionicLoading, LocalService, $ionicPopup, EstudianteService) {
  var id = $stateParams.id;
  $scope.alumnos = [];

  function cargarAlumnos() {
    EstudianteService.checarAsistencias(id).success(function(data){
      console.log(data);
      if(!data.status){
        EstudianteService.getEstudiantes(id).success(function(data) {
          console.log(data);
          for (var i = 0; i < data.group.students.length; i++) {
            var alumno = data.group.students[i];
            alumno.assistance = true;
            $scope.alumnos.push(alumno);
          }
          LocalService.set('students', JSON.stringify($scope.alumnos));

        }).error(function(e) {

        });
      }else{
        $scope.alumnos = angular.fromJson(LocalService.get('students'));
      }
    }).error(function(e){
      console.log(e);
    });

    // if (!LocalService.get('students')) {
    //   EstudianteService.getEstudiantes(id).success(function(data) {
    //     console.log(data);
    //     for (var i = 0; i < data.group.students.length; i++) {
    //       var alumno = data.group.students[i];
    //       alumno.assistance = true;
    //       $scope.alumnos.push(alumno);
    //     }
    //     LocalService.set('students', JSON.stringify($scope.alumnos));
    //
    //   }).error(function(e) {
    //
    //   });
    // } else {
    //   $scope.alumnos = angular.fromJson(LocalService.get('students'));
    // }
  }

  cargarAlumnos();

  $scope.guardarCambio = function() {
    console.log($scope.alumnos);
    LocalService.set('students', JSON.stringify($scope.alumnos));
  }

  $scope.enviar = function() {
    var r = $scope.confirm("Asistencia", "¿Estas seguro de enviar las Asistencias?");
    r.then(function(res) {
      if (res) {
        $ionicLoading.show({
          content: 'Enviando..',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
        });



        $timeout(function() {
          $ionicLoading.hide();
          EstudianteService.setAsistencia(id, LocalService.get('students')).success(function(data) {
            console.log(data);
            if (data.http_code == 202) {
              $scope.showAlert('Asistencia', data.errors[0].message);
            } else {
              $scope.showAlert('Asistencia', data.message);
            }

          }).error(function(e) {
            console.log(e);
            $scope.showAlert('Asistencia', data.errors[0].message);
          });
        }, 400);
      }
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


  $scope.confirm = function(t, m) {
    var confirmPopup = $ionicPopup.confirm({
      title: t,
      template: m
    });
    return confirmPopup
  };

});
