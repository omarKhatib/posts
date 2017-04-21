var app = angular.module("app.home", ["ngRoute", "requestsModule", "privModule", "tokenModule", "authModule"]);

app.config(function($routeProvider) {
  $routeProvider.when("/home", {
    templateUrl: "/views/home.tpl.html",
    controller: "homeCtrl"
  });
});

app.controller("homeCtrl", function($scope, Service, privService, tokenService,authService, $location) {
  $scope.todoItems = [];
  $scope.userinput = {};
        var tags = [];
    
//  $scope.priv = privService.getPriv();
//  console.log($scope.priv);
    
  $scope.get = function(){
        console.log('getting data');
        Service.getPosts().then(function(response){
            $scope.posts = response.data;
            console.log($scope.posts);
            
            
            
        })
    }
    
    $scope.addPost = function(){
        var postArr = $scope.post.split(" ");
        //var tags = [];
        for(var i=0 ; i<postArr.length ; i++){
            if(postArr[i][0] == "#"){
                tags.push(postArr[i]);
            }
            
        }
        
        
        
        
      
        
        var username = $scope.username;
        var data = {post: $scope.post, image:$scope.image, likes:0, disLikes:0, tags, username};
        Service.addPost(data).then(function(response){
            //$scope.message = response.data;
            $scope.post='';
            $scope.image = '';
            $scope.get();
            
            
        });
        
        
        
        
        
    }
    
    $scope.username = privService.getUser(); //get username for each post
    
      $scope.getProfileImage  =function(){
            alert('getting user data');
            authService.getProfileImage($scope.username).then(function(response){
                console.log(response.data.data);
                $scope.i = response.data.data.profileImage;
                
                
            }, function(response){
                console.log('error in getting user data')
                
            })
            
            
            
            
            
        }


    $scope.edit = function(id,i,likes,dislikes){
     var post = $("#"+i).text();
        
        var data = {post:post ,likes:likes, disLikes:dislikes};
         Service.updatePost(id,data).then(function(response){
            //$scope.message = response.data;
            $scope.get();
            
            
        });
        
    }
    

  $scope.remove = function(id){
        Service.deleteData(id).then(function(response){

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
     
     
     $scope.getComments = function(id){
         
         Service.getComments(id).then(function(response){
             $scope.comments=response.data.data.comments;
             
         })
         
         
         
     }
     
     
     $scope.addComment= function(id, comment){
         var data = {comment:comment};
         $scope.comment = '';
         
         Service.addComment(id,data).then($scope.getComments(id), function(err){
             console.log('error'+err);
             
         });
         
         
         
     }
     
       $scope.signout = function() {
           
     tokenService.removeToken();
      privService.removeUser();
      $location.path("/signin");

  }
     
     
     
     
//     $('#postTextArea').keypress(function (event) {
//            if (event.which == 13) {
//                $('#postTextArea').val('');
//                $scope.addPost();
//            }
//        });
  
  
  
  
    
    
});
