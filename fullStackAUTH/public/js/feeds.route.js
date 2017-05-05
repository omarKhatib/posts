var app = angular.module("app.feeds", ["ngRoute", "requestsModule", "privModule", "tokenModule", "authModule"]);

app.config(function($routeProvider) {
  $routeProvider.when("/feeds", {
    templateUrl: "/views/feeds.tpl.html",
    controller: "feedsCtrl"
  });
});

app.controller("feedsCtrl", function($scope, Service, privService, tokenService,authService, $location) {
    
      $scope.todoItems = [];
  $scope.userinput = {};
        var tags = [];
    
//  $scope.priv = privService.getPriv();
//  console.log($scope.priv);
//    
//  $scope.get = function(){
//        console.log('getting data');
//        Service.getPosts().then(function(response){
//            $scope.posts = response.data;
//            console.log($scope.posts);
//            
//            
//            
//        })
//    }
    
    
    
    $scope.notifications =[];
$scope.loadConnection = function() {
    
  
    $scope.socket = Service.connect();
    Service.getNotification($scope.socket, function(data) {
          
        if(data.to == $scope.username){
   
            
            $scope.notifications.push(data);
            $scope.notificationNum = $scope.notifications.length;
            console.log($scope.notifications);
            console.log($scope.notificationNum);
            $scope.$apply();

        }
    });
  };
  
  
    $scope.getAllUsersPosts = function(){
        console.log('getting data');
        Service.getAllUsersPosts().then(function(response){
            $scope.postss = response.data;
            console.log($scope.postss);
            
            
            
        })
    }
    
    
        $scope.get = function(uu){
        console.log('getting data');
        Service.getUserPosts(uu).then(function(response){
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
            $scope.getAllUsersPosts();
            
            
        });
        
        
        
        
        
    }
    
    $scope.username = privService.getUser(); //get username for each post
    
//      $scope.getProfileImage  =function(){
//            alert('getting user data');
//            authService.getProfileImage($scope.username).then(function(response){
//                console.log(response.data.data);
//                $scope.i = response.data.data.profileImage;
//                
//                
//            }, function(response){
//                console.log('error in getting user data')
//                
//            })
//            
//            
//            
//            
//            
//        }
    
    
          $scope.getProfilesImages =function(user){
              console.log(user);
           
            authService.getProfileImage(user).then(function(response){
               $scope.i = response.data.data.profileImage;
                console.log($scope.i);
                
                
            }, function(response){
                console.log('error in getting user data')
                
            })
            
            
        }
    
    


    $scope.edit = function(id,i,likes,dislikes){
     var post = $("#"+i).text();
        
        var data = {post:post ,likes:likes, disLikes:dislikes};
         Service.updatePost(id,data).then(function(response){
            //$scope.message = response.data;
            $scope.getAllUsersPosts();
            
            
        });
        
    }
    

  $scope.remove = function(id){
        Service.deleteData(id).then(function(response){

            $scope.getAllUsersPosts();
            
            
        });
        
    }
  
      
    $scope.like = function(id,post,likes,disLikes,to){
        var data = {post:post, likes:likes+1, disLikes:disLikes};
        Service.likeDisLike(id,data).then(function(response){
            Service.emitNotification($scope.socket,privService.getUser(),to,'like');
            $scope.getAllUsersPosts();
            
              

  
            
            
            
        })
        
    }
    
     $scope.disLike = function(id,post,likes,disLikes){
        var data = {post:post, likes:likes, disLikes:disLikes+1};
        Service.likeDisLike(id,data).then(function(response){
            $scope.getAllUsersPosts();
            
            
            
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
    

  
    
    
});
