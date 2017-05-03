var app = angular.module("authModule", []);

app.service("authService", function($http) {
    this.getProfileImage = function(username){
        return $http.get("http://localhost:8070/auth/"+username);
         
    }
    
    
    
    this.getUsers = function(){
        return $http.get("http://localhost:8070/auth/");
    }
    
  this.postSignup = function(data) {
    return $http.post("http://localhost:8070/auth/signup", data);
  };

  this.postSignin = function(data) {
    return $http.post("http://localhost:8070/auth/signin", data);
  };
    
          
      this.updateInfo = function(username, data){

          return $http.put("http://localhost:8070/auth/"+username+'/',data);
      }
});
