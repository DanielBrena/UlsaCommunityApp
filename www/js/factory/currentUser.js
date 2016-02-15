app.factory('CurrentUser',function(LocalService){
	return {
		user: function(){
			if(LocalService.get('token_teacher')){

				return angular.fromJson(LocalService.get('token_teacher'));
			}else{
				return {};
			}
		}
	}
});
