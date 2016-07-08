app.controller('PrincipalCtrl', function($scope,PrincipalService,CurrentUser,$filter) {
//  $scope.gender.data = [];
//  $scope.data = [];
$scope.date = new Date();
$scope.gender = {};
$scope.gender.data = [];
  $scope.gender.labels = ["Hombre","Mujer"];
  $scope.gender.colores = ["#55acee","#f8f8f8"];
//  $scope.date = new Date();

  $scope.viernes = {}
  $scope.labels1 = [];
  $scope.count1 = [];




  function obtenerInformacion(){
    CurrentUser.getInformacion().success(function(data){
      $scope.teacher = data;
      console.log(data);
    }).error(function(e){

    });
  }

  obtenerInformacion();

  function obtenerEstadisticasHombres(){

    // PrincipalService.getStudents(CurrentUser.user().user.teacher,"hombre").success(function(data){
    //   console.log(data);
    //   $scope.data.push(data.count);
    //
    // }).error(function(error){
    //   console.log(error);
    // });

    PrincipalService.getStudents().success(function(data){
      console.log(data);
      var hombres = 0;
      var mujeres = 0;
      _.each(data, function(key,val,list){
          var s = _.groupBy(key.students, "gender");
          console.log(s);
          if(s && s.hombre && s.mujer && s.hombre.length && s.mujer.length){
            hombres+= s.hombre.length;
            mujeres+= s.mujer.length;
          }

      });
      console.log(hombres + " " + mujeres);
      $scope.gender.data.push(hombres);
      $scope.gender.data.push(mujeres);

    }).error(function(e){

    });

    // PrincipalService.getStudents(CurrentUser.user().user.teacher,"mujer").success(function(data){
    //   console.log(data);
    //   $scope.data.push(data.count);
    //
    // }).error(function(error){
    //   console.log(error);
    // });
    //
    // console.log($scope.data);
  }


  obtenerEstadisticasHombres();


  function obtenerEstadisticasViernes(){
    PrincipalService.getAssistancesViernes().success(function(data){
      console.log(data);
      var s = _.groupBy(data, "date");
      _.each(s, function(key,val,list){
       $scope.labels1.push($filter('date')(val,'yyyy-MMMM-dd'));
       $scope.count1.push(key.length);
      });
      $scope.data1 = [$scope.count1];
      console.log($scope.data1);
    }).error(function(e){

    });

  }

  obtenerEstadisticasViernes();



});
