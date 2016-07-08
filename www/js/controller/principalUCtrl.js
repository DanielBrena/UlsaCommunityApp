app.controller('PrincipalUCtrl',function($scope,$rootScope,$ionicLoading,$filter,$cordovaBadge,EventosService,$q,$ionicPopup,$cordovaCalendar,CONFIG,SuscripcionesFactory,CurrentUser,$cordovaLocalNotification,$ionicPlatform){
  $scope.rutaImagen = CONFIG.APIURL;
  var socket = io.sails.connect();
  $scope.nuevosEventos = [];


  // document.addEventListener("deviceready", function () {
  //   $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
  //   $scope.offlineState = networkState;
  //  })
  //
  //
  // });


  function suscripcion(){
    SuscripcionesFactory.suscripcionEventos(CurrentUser.user(),function(data){
      console.log(data);
    });

  }
  suscripcion();
  //
  io.socket.on('events', function (data){
    $scope.nuevosEventos.push(data);
    $scope.$apply();


    // cordova.plugins.notification.local.schedule({
    //     id: 1,
    //     title: data.title,
    //     text: data.description,
    //     data: { customProperty: 'Fecha: ' + $filter('date')(data.dateStart, "yyyy-MM-dd")}
    // });


    $cordovaLocalNotification.schedule({
      id: 1,
      title: data.title,
      text: data.description,
      data: {
        customProperty: 'Fecha: ' + $filter('date')(data.dateStart, "yyyy-MM-dd")
      }
    }).then(function (result) {
      console.log(result);
    });

    console.log(data);
  });


  $scope.cargarLoad = function() {
    $ionicLoading.show({
      template: '<ion-spinner icon="ripple"></ion-spinner>'
    });
  };

  $scope.ocultarLoad = function(){
    $ionicLoading.hide();
  };




  $scope.getEventos = function(){
    $scope.cargarLoad();
    $scope.nuevosEventos = [];
    CurrentUser.getInformacion().success(function(data){
      var groups = [];
      data.groups.forEach(function(g){
        groups.push(g.id);
      });

    var resultado = [];
      EventosService.getEventos().success(function(data){
        data.forEach(function(d){
          if(d.diffusion == 'grupos'){
            var r = _.contains(groups,d.group.id);
            if(r){
              resultado.push(d);
            }
          }
          if(d.diffusion == 'todos'){
            resultado.push(d);
          }
        });

        var deferred = $q.defer();
        var promises = [];
        resultado.forEach(function(ev){

          console.log(ev);

          promises.push($cordovaCalendar.findEvent({
                 title:ev.title,
                 startDate:new Date(ev.dateStart).toISOString(),
                 endDate:new Date(ev.dateEnd).toISOString()
             }));
        });

        $q.all(promises).then(function(results) {

              for(var i=0;i<results.length;i++) {
                  resultado[i].status = results[i].length === 1;
              }
          });

        $scope.eventos = resultado;
        $scope.ocultarLoad();
      }).error(function(e){
        console.log(e);
        $scope.ocultarLoad();
      });

    }).error(function(e){
      $scope.ocultarLoad();
    }).finally(function() {
       $scope.$broadcast('scroll.refreshComplete');
     });
  }

  $scope.getEventos();

  $scope.agregarEvento = function(e){
    $cordovaCalendar.createEvent({
      title: e.title,
       notes: e.description,
       startDate: new Date(e.dateStart).toISOString(),
       endDate:new Date(e.dateEnd).toISOString(),
    }).then(function (result) {
        console.log('success');
        $scope.showAlert('Exito',"Se agregó el evento a tu calendario");
        $scope.getEventos();
    }, function (err) {
        $scope.showAlert('Error',err);
        console.log('error');
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
