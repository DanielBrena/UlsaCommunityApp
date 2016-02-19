app.controller('EstudianteCtrl', function($scope, $stateParams, $timeout, $ionicLoading, LocalService, $ionicPopup, EstudianteService) {
  var id = $stateParams.id;
  var idLocalStorage = "students_" + id;
  $scope.alumnos = [];

  function cargarAlumnos() {
    EstudianteService.getEstudiantes(id).success(function(data) {
      console.log(data);
      for (var i = 0; i < data.group.students.length; i++) {
        var alumno = data.group.students[i];
        alumno.assistance = true;
        $scope.alumnos.push(alumno);
      }
      LocalService.set(idLocalStorage, JSON.stringify($scope.alumnos));

    }).error(function(e) {

    });
  }

  function getDate(){
    var d = new Date();
    var datestring = d.getFullYear() + "/" + (d.getMonth()+1)  + "/" +d.getDate();
    return datestring;
  }

  function checarAsistencias(){
    EstudianteService.checarAsistencias(id).success(function(data){
      if(!data.status){//No ha pasado lista
        if(!LocalService.get(idLocalStorage)){ //Si no hay datos guardados
          cargarAlumnos();
        }else{
          $scope.alumnos = angular.fromJson(LocalService.get(idLocalStorage));
        }
      }else{//Ya se paso lista
        if(!LocalService.get(idLocalStorage)){ //Si no hay datos guardados
          cargarAlumnos();
        }else{
          $scope.alumnos = angular.fromJson(LocalService.get(idLocalStorage));
        }
      }
    }).error(function(e){

    });
  }

  checarAsistencias();

  $scope.guardarCambio = function() {
    console.log($scope.alumnos);
    LocalService.set(idLocalStorage, JSON.stringify($scope.alumnos));
  }

  $scope.enviar = function() {
    var r = $scope.confirm("Asistencia", "¿Está seguro de enviar las Asistencias para la fecha " + getDate() + "?");
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
          EstudianteService.setAsistencia(id, LocalService.get(idLocalStorage)).success(function(data) {
            console.log(data);
            if (data.http_code == 202) {
              $scope.showAlert('Asistencia', data.errors[0].message);
              //LocalService.unset('students');
            } else {
              $scope.showAlert('Asistencia', data.message);
              //  LocalService.unset(idLocalStorage);
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
