app.config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts

  }])
app.controller('EstadisticaGrupoCtrl',function($scope,$stateParams,DetalleGrupoService){
  $scope.id = $stateParams.id;
  $scope.asistencia = {};
  $scope.asistencia.data = [];
  $scope.asistencia.labels = [];
  $scope.asistencia.options = {
    responsive: true,
  maintainAspectRatio: false
        };

  $scope.data = [];

  window.onload = function() {
    Chart.defaults.global.responsive = true;
Chart.defaults.global.maintainAspectRatio = false;


        };

  function getEstudiantes(){
    DetalleGrupoService.getEstudiantes($scope.id).success(function(data){
      $scope.estudiantesArreglo = data.students;

      //console.log($scope.estudiantesArreglo);


      for(var i = 0; i < $scope.asistencia.labels.length; i++){
        var s = _.find($scope.estudiantesArreglo,function(data){
          return data.id === $scope.asistencia.labels[i];
        })
        //console.log(s);
      //  console.log($scope.asistencia.labels[i]);
        $scope.asistencia.labels[i] = s.name + " " + s.lastname;
      }
      console.log($scope.asistencia.labels);


    }).error(function(e){

    });

  }

  function alumnosConMayorFaltas(numero){
    DetalleGrupoService.getEstudiantes($scope.id).success(function(data){
      if(data.length > 0){
        $scope.estudiantesArreglo = data.students;
        var a = [];
        var f = [];

        for(var i = 0; i < numero; i++){
          var s = _.find($scope.estudiantesArreglo,function(data){
            return data.id === $scope.data[i].id;
          })
          a.push($scope.data[i].asistencia);
          f.push($scope.data[i].sinasistencia);
          $scope.asistencia.labels.push(s.name + " " + s.lastname.split(' ')[0]);

          console.log(s);
        }
        $scope.asistencia.data.push(a,f);
      }



    }).error(function(e){

    });


  }



  function getAsistencias(){

    DetalleGrupoService.getAsistencias($scope.id,"asistencia").success(function(data){

      var arreglo = _.groupBy(data,'student');

      var a = [];
      var f = [];



      var asistencias = _.each(arreglo,function(key,val,list){
        var student = {};
        //$scope.asistencia.labels.push(val);
        student.id = val;
        var asistencia_aux = _.groupBy(key,'type');

        if(asistencia_aux.hasOwnProperty(true) && asistencia_aux.hasOwnProperty(false)){
        //  a.push(asistencia_aux.true.length);
        //  f.push(asistencia_aux.false.length);
          student.asistencia = asistencia_aux.true.length
          student.sinasistencia = asistencia_aux.false.length

        }else{
          if(asistencia_aux.hasOwnProperty(true)){
          //  a.push(asistencia_aux.true.length);
          //  f.push(0);
            student.asistencia = asistencia_aux.true.length
            student.sinasistencia = 0
          }else{
          //  a.push(0);
          //  f.push(asistencia_aux.false.length);
            student.asistencia = 0
            student.sinasistencia = asistencia_aux.false.length
          }
        }
        $scope.data.push(student);
      });
      //$scope.asistencia.data.push(a,f);

      //console.log($scope.data);
      $scope.data = _.sortBy($scope.data,'asistencia');
    //  console.log(sort);

      console.log($scope.asistencia.data);
      console.log($scope.asistencia.labels);

      alumnosConMayorFaltas(10);

    //  getEstudiantes();
    }).error(function(e){

    });

  }

  getAsistencias();






});
