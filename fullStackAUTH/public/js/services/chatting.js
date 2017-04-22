var app = angular.module("chattingModule", []);

app.service("chattingService", function($http) {

    
    this.getMessages = function(data){
        return $http.get("http://localhost:8070/chatting/", data);
    }
    
  this.postMessage = function(data) {
    return $http.post("http://localhost:8070/chatting/", data);
  };

});
