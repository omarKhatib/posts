var ang = angular.module("app", []);
ang.service("Service", function ($http) {
 
    this.getPosts = function () { 
        return $http.get("http://localhost:8000/posts")
    }
 
    
    
    
    this.addPost = function (data) { 
        return $http.post("http://localhost:8000/posts/",data)
    }
     this.deleteData = function (id) { 
        return $http.delete("http://localhost:8000/posts/"+id)
    }
     
      this.likeDisLike = function (id,data) { 
        return $http.put("http://localhost:8000/posts/"+id+'/',data);
    }
      
      this.updatePost = function(id,data){
          return $http.put("http://localhost:8000/posts/"+id+'/',data);
          
      }




});

ang.controller("ctrl", function ($scope, Service) {
    $scope.get = function(){
        Service.getPosts().then(function(response){
            $scope.posts = response.data;
            
            
            
        })
    }
    
    $scope.remove = function(id){
        Service.deleteData(id).then(function(response){

            $scope.get();
            
            
        });
        
    }
    
    

    
    
    $scope.addPost = function(){
        var data = {post: $scope.post, likes:0, disLikes:0};
        Service.addPost(data).then(function(response){
            //$scope.message = response.data;
            $scope.get();
            
            
        });
        
        
        
        
        
    }
    
  
    
    

    $scope.edit = function(id,likes,dislikes){
        var p = $('#editedPost').text();
        var data = {post:p, likes:likes, disLikes:dislikes};
        console.log(data);
         Service.updatePost(id,data).then(function(response){
            //$scope.message = response.data;
            $scope.get();
            
            
        });
        
    }
   
    
    
    

    
    $scope.like = function(id,post,likes,disLikes){
        var data = {post:post, likes:likes+1, disLikes:disLikes};
        Service.likeDisLike(id,data).then(function(response){
            $scope.get();
            
            
            
        })
        
    }
    
     $scope.disLike = function(id,post,likes,disLikes){
        var data = {post:post, likes:likes, disLikes:disLikes+1};
        Service.likeDisLike(id,data).then(function(response){
            $scope.get();
            
            
            
        })
        
    }
     
     $('#postTextArea').keypress(function (event) {
            if (event.which == 13) {
                $('#postTextArea').val('');
                $scope.addPost();
            }
        });
    

     
     
     
     
     
    
//    $scope.update = function(id){
//        var data = {name: $scope.name, age:$scope.age};
//        Service.putData(id, data).then(function(response){
//            $scope.message = 'updated!';
//            $scope.get();
//            
//            
//            
//        })
//        
//        
//        
//        
//        
//        
//    }


});