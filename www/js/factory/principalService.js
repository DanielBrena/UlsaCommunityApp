app.factory('PrincipalService',function($http,CONFIG){
  return {
    getStudents:function(){
      //var students = $http.get(CONFIG.APIURL + "statistics/studentsTeacher/"+id+"/gender/" +gender);
      var students = $http.get(CONFIG.APIURL + "teachers/statisticsGenderStudents");
      return students;
    },
    getAssistancesViernes:function(){
      var assistances = $http.get(CONFIG.APIURL + "teachers/statisticsViernes");
      return assistances;
    }
  }
});
