var app = angular.module("requestsModule", []);

app.service("Service", function($http) {
    this.getUserPosts = function (username) { 
        return $http.get("http://localhost:8070/posts/"+username);
    }
    this.getAllUsersPosts = function(){
        return $http.get("http://localhost:8070/posts/");
        
    }
    this.getComments = function(id){
        return $http.get("http://localhost:8070/posts/"+id);
    }
 
    this.addPost = function (data) { 
        return $http.post("http://localhost:8070/posts/",data)
    }
     this.deleteData = function (id) { 
        return $http.delete("http://localhost:8070/posts/"+id)
    }
     
      this.likeDisLike = function (id,data) { 
        return $http.put("http://localhost:8070/posts/"+id+'/',data);
    }
      
      this.updatePost = function(id,data){
          return $http.put("http://localhost:8070/posts/"+id+'/',data);
          
      }
      
      this.addComment = function(id, data){
          
          return $http.post("http://localhost:8070/posts/"+id+'/',data);
          
      }
      

});
