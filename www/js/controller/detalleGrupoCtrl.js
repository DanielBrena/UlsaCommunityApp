app.controller('DetalleGrupoCtrl', function($scope, $stateParams,$state,$ionicActionSheet, $timeout, $ionicLoading, LocalService, $ionicPopup, DetalleGrupoService) {
  var id = $stateParams.id;
  var idLocalStorage = "students_" + id;
  $scope.alumnos = [];

  DetalleGrupoService.getEstudiantes(id).success(function(data){
    var s = _.groupBy(data.students, "gender");
    console.log(s);
  }).error(function(e){});

  function cargarAlumnos() {
    DetalleGrupoService.getEstudiantes(id).success(function(data) {
      console.log(data);

      for (var i = 0; i < data.students.length; i++) {
        var alumno = data.students[i];
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
    DetalleGrupoService.checarAsistencias(id).success(function(data){
      if(!data.status){//No ha pasado lista
        if(!LocalService.get(idLocalStorage)){ //Si no hay datos guardados
          cargarAlumnos();
        }else{
          $scope.alumnos = angular.fromJson(LocalService.get(idLocalStorage));
          if($scope.alumnos.length == 0){
            cargarAlumnos()
          }else{
            $scope.alumnos = angular.fromJson(LocalService.get(idLocalStorage));
          }
        }
      }else{//Ya se paso lista
        if(!LocalService.get(idLocalStorage)){ //Si no hay datos guardados
          cargarAlumnos();
        }else{
          $scope.alumnos = angular.fromJson(LocalService.get(idLocalStorage));
          if($scope.alumnos.length == 0){
            cargarAlumnos()
          }else{
            $scope.alumnos = angular.fromJson(LocalService.get(idLocalStorage));

          }
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
          var data= {};
          data.estudiantes = LocalService.get(idLocalStorage);
          data.grupo = id;
          DetalleGrupoService.setAsistencia(data).success(function(result) {
            console.log(result);
            if (result.http_code == 202) {
              $scope.showAlert('Asistencia', result.errors[0].message);
              //LocalService.unset('students');
            } else {
              $scope.showAlert('Asistencia', result.message);
              //  LocalService.unset(idLocalStorage);
            }

          }).error(function(e) {
            console.log(e);

            $scope.showAlert('Asistencia', 'Ya se pasó la asistencia del día de hoy');
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

  $scope.onHold = function(estudiante){
    console.log(estudiante);

    var hideSheet = $ionicActionSheet.show({
      buttons: [
        { text: 'Mostrar asistencias' },
      //  { text: 'Move' }
      ],
    //  destructiveText: 'Delete',
      titleText: 'Opciones del alumno',
      cancelText: 'Cancelar',
      cancel: function() {
        // add cancel code..
      },
      buttonClicked: function(index) {
        console.log(index);
        detalleEstudiante(estudiante);
        return true;
      }
    });

  }

  function detalleEstudiante(estudiante){
    $state.go('maestro.estudiante',{grupo:id,estudiante:JSON.stringify(estudiante)});
  }





});
