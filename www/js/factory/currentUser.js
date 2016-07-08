app.factory('CurrentUser',function(LocalService,CONFIG,$http){
	return {
		user: function(){
			if(LocalService.get('token_teacher')){

				return angular.fromJson(LocalService.get('token_teacher'));
			}else if(LocalService.get('token_student')){
				return angular.fromJson(LocalService.get('token_student'));
			}else{
				return null;
			}
		},
		getInformacion:function(){
			var method = "";
			if(this.user()){
				if(this.user().user.access_level == 0){
					method = "students/me";
				}else{
					method = "teachers/me";
				}
				var user = $http.get(CONFIG.APIURL + method,{
				}).success(function(data){

				});
			}

			return user;
		},
		setInformacion:function(usuario){
			var user = $http.put(CONFIG.APIURL + "teachers/me/update",usuario,{
			}).success(function(data){

			});
			return user;
		},
		updateUsuario:function(usuario){
			var resultado = $http.put(CONFIG.APIURL + "users/"+usuario.id,usuario);
			return resultado;
		},
		updateAlumno:function(alumno){
			var resultado = $http.put(CONFIG.APIURL + "students/"+alumno.id,alumno);
			return resultado;
		},
		updateMaestro:function(maestro){
			var resultado = $http.put(CONFIG.APIURL + "teachers/"+maestro.id,maestro);
			return resultado;
		}
	}
});
