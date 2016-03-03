app.factory('CurrentUser',function(LocalService,CONFIG,$http){
	return {
		user: function(){
			if(LocalService.get('token_teacher')){

				return angular.fromJson(LocalService.get('token_teacher'));
			}else{
				return {};
			}
		},
		getInformacion:function(){
			var user = $http.get(CONFIG.APIURL + "teachers/me",{
			}).success(function(data){

			});
			return user;
		},
		setInformacion:function(usuario){
			var user = $http.put(CONFIG.APIURL + "teachers/me/update",usuario,{
			}).success(function(data){

			});
			return user;
		},
	}
});
