app.controller('GrupoUCtrl',function($scope,$rootScope,$q,$ionicLoading,$state,CONFIG,$ionicPopup,GrupoService,CurrentUser){
  $scope.gruposActivos = [];
  $scope.gruposAlumno = [];
  $scope.ruta = CONFIG.APIURL;


  $scope.cargarLoad = function() {
    $ionicLoading.show({
      template: '<ion-spinner icon="ripple"></ion-spinner>'
    });
  };

  $scope.ocultarLoad = function(){
    $ionicLoading.hide();
  };

  $scope.obtenerGrupos = function(){
    $scope.cargarLoad();
    GrupoService.getGruposAlumno().success(function(data){

      $scope.gruposAlumno = data.groups;
      console.log(data);

      GrupoService.getGruposActivos().success(function(data){


        var deferred = $q.defer();
        var promises = [];

        data.forEach(function(g){
          console.log(g);

          var grupo = _.find($scope.gruposAlumno,function(s){
            console.log(s.id === g.id);
            return s.id === g.id
          });
          console.log("----");
          promises.push(grupo);
          console.log(grupo);

        });

        $q.all(promises).then(function(results) {
          console.log(results);

              for(var i=0;i<results.length;i++) {
                  data[i].inscription = results[i] != undefined;
              }
          });


        console.log(data);
        var nuevoArreglo = [];
        for (var i=0; i<data.length; i+=2) {
            nuevoArreglo.push(data.slice(i, i+2));
        }
        $scope.gruposActivos = nuevoArreglo;
        $scope.ocultarLoad();
        console.log($scope.gruposActivos);

      }).error(function(e){
        $scope.ocultarLoad();
      });

    }).error(function(e){
      $scope.ocultarLoad();
    }).finally(function() {
      $scope.$broadcast('scroll.refreshComplete');
    });


  }
  function obtenerGruposAlumno(){
    GrupoService.getGruposAlumno().success(function(data){
      console.log(data);
      $scope.gruposAlumno = data.groups;
    }).error(function(e){

    });
  }
  $scope.obtenerGrupos();

  $scope.inscripcion = function(g){
    var grupo = {};
    grupo.estudiante = CurrentUser.user().user.student;
    grupo.grupo = g.id
    console.log(grupo);

    GrupoService.addAlumno(grupo).success(function(data){
      setTimeout(function() {

      $scope.obtenerGrupos();
      $scope.$apply();
    }, 500);

    }).error(function(e){

    });
  }

  $scope.baja = function(g){
    var grupo = {};
    grupo.estudiante = CurrentUser.user().user.student;
    grupo.grupo = g.id
    console.log(grupo);

    GrupoService.removeAlumno(grupo).success(function(data){
      setTimeout(function() {

      $scope.obtenerGrupos();
      $scope.$apply();
      }, 500);
    }).error(function(e){

    });
  }

  $scope.grupoEstudiante = function(g){
    $state.go('alumno.detalleGrupo',{
      id:g.id,
      alumno:CurrentUser.user().user.student
    })
  }

  $scope.grupoInformacion = function(g){
    console.log(g);
    $state.go('alumno.detalleGrupo',{
      id:g.id
    })
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
