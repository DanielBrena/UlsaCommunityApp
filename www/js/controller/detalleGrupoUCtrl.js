app.controller('DetalleGrupoUCtrl',function($scope,$q,$ionicPopup,CONFIG,$cordovaCalendar,$stateParams,EstudianteService,GrupoService){
  console.log($stateParams.alumno);
  $scope.ruta = CONFIG.APIURL;
  var id = $stateParams.id;
  $scope.alumno = $stateParams.alumno;
  $scope.asistenciasCount = {};
  console.log(id);

  $scope.nombre = "Grupo1"

  $scope.getGrupo = function(){
    GrupoService.getGrupo(id).success(function(data){
      console.log(data);
      $scope.grupo = data;


      var deferred = $q.defer();
      var promises = [];
      data.events.forEach(function(ev){

        console.log(ev);

        promises.push($cordovaCalendar.findEvent({
               title:ev.title,
               startDate:new Date(ev.dateStart).toISOString(),
               endDate:new Date(ev.dateEnd).toISOString()
           }));
      });

      $q.all(promises).then(function(results) {

            for(var i=0;i<results.length;i++) {
                data.events[i].status = results[i].length === 1;
            }
        });
      $scope.grupo.events = data.events;



    }).error(function(e){

    }).finally(function() {
       $scope.$broadcast('scroll.refreshComplete');
     });
  }

  $scope.agregarEvento = function(e){
    $cordovaCalendar.createEvent({
      title: e.title,
       notes: e.description,
       startDate: new Date(e.dateStart).toISOString(),
       endDate:new Date(e.dateEnd).toISOString(),
    }).then(function (result) {
        console.log('success');
        $scope.showAlert('Exito',"Se agregó el evento a tu calendario");
        $scope.getGrupo();
    }, function (err) {
        $scope.showAlert('Error',err);
        console.log('error');
    });
  }

  function cargarAsistencias(){
    console.log($scope.alumno + " " +id);
    EstudianteService.getAsistencias($scope.alumno,id).success(function(data){
      console.log(data);
      $scope.asistenciasCount = _.groupBy(data.assistances,function(asistencia){
        if(asistencia.type2 == 'asistencia'){
          return asistencia.type;
        }
      });
      console.log($scope.asistenciasCount);
      $scope.asistencias = data.assistances;
      if($scope.asistenciasCount.true ){
        cargarCalificacion($scope.asistenciasCount.true.length);
      }
    }).error(function(e){
      console.log(e);
    });
  }

  function cargarCalificacion(asistencias){
    EstudianteService.getCalificacion(asistencias).success(function(data){
      $scope.asistenciasCount.calificacion = data;
    }).error(function(e){

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

  $scope.getGrupo();

  cargarAsistencias();
});
