app.controller('GrupoCtrl', function($scope,CONFIG,$ionicPlatform, $cordovaLocalNotification,$timeout, $ionicLoading, GrupoService, $ionicPopup, $state,$ionicActionSheet) {
  	$ionicPlatform.ready(function () {
  $scope.ruta = CONFIG.APIURL;

  $scope.cargarGrupos = function() {
    // $ionicLoading.show({
    //   content: 'Cargando grupos..',
    //   animation: 'fade-in',
    //   showBackdrop: true,
    //   maxWidth: 200,
    //   showDelay: 0
    // });

    GrupoService.getGrupos().success(function(data) {
      var nuevoArreglo = [];
      for (var i=0; i<data.groups.length; i+=2) {
          nuevoArreglo.push(data.groups.slice(i, i+2));
      }

      console.log(data);
      $scope.grupos = nuevoArreglo;
      // $ionicLoading.hide();
      console.log($scope.grupos);

    }).error(function(e) {
      // $ionicLoading.hide();
    }).finally(function() {
      $scope.$broadcast('scroll.refreshComplete');
      // $ionicLoading.hide();
    });;

    // $timeout(function() {$ionicLoading.hide();}, 1000);




  }
  $scope.cargarGrupos();


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

  $scope.opciones = function(grupo){
    console.log(grupo);

    var hideSheet = $ionicActionSheet.show({
      buttons: [
        { text: 'Enviar aviso' },
        { text: 'Mostrar estadisticas' }
      ],
    //  destructiveText: 'Delete',
      titleText: grupo.name,
      cancelText: 'Cancelar',
      cancel: function() {
        // add cancel code..
      },
      buttonClicked: function(index) {
        console.log(index);
        switch(index){
          case 0:
            //  $scope.showPopup();
            $scope.notificacion()
          break;
          case 1:
            console.log("Mostrar estadisticas");
            $state.go("maestro.estadistica", {
              id: grupo.id
            });
          break;
        }

        return true;
      }
    });

  }

  $scope.notificacion = function(){

        $cordovaLocalNotification.schedule({
          id: 1,
          text: 'Instant Notification',
          title: 'Instant'
        }).then(function () {
          alert("Instant Notification set");
        });;



  }

  $scope.showPopup = function() {
  $scope.data = {};

  // An elaborate, custom popup
  var myPopup = $ionicPopup.show({
    template: '<input type="text" ng-model="data.aviso">',
    title: 'Aviso',
    subTitle: 'Escribe tu mensaje',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Enviar</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.data.aviso) {
            //don't allow the user to close unless he enters wifi password
            e.preventDefault();
          } else {
            console.log($scope.data.aviso);
            $timeout(function() {
               myPopup.close(); //close the popup after 3 seconds for some reason
            }, 1000);
            return $scope.data.aviso;
          }
        }
      }
    ]
  });

  myPopup.then(function(res) {
    console.log('Tapped!', res);
  });


 };

 });



});
