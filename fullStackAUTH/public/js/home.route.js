var app = angular.module("app.home", ["ngRoute", "requestsModule", "privModule", "tokenModule", "authModule","notificationsModule"]);

app.config(function($routeProvider) {
  $routeProvider.when("/home", {
    templateUrl: "/views/home.tpl.html",
    controller: "homeCtrl"
  });
});

app.controller("homeCtrl", function($scope, Service, privService, tokenService,authService,notificationsService, $location) {
  $scope.todoItems = [];
  $scope.userinput = {};
        var tags = [];
    
//  $scope.priv = privService.getPriv();
//  console.log($scope.priv);
        $scope.notifications =[];
    
$scope.loadConnection = function() {
    
  
    $scope.socket = Service.connect();
    Service.getNotification($scope.socket, function(data) {
          
        if(data.to == $scope.username && data.from!=$scope.username){
   
            
            $scope.notifications.push(data);
            
            $scope.notificationNum = $scope.notifications.length;
            
            console.log($scope.notifications);
            console.log($scope.notificationNum);
            $scope.$apply();

        }
    });
  };
    
    
    
    $scope.getOldNotifications = function(){
        notificationsService.getNotifications($scope.username).then(function(response){
            $scope.oldNotifications = response.data.data;
            console.log($scope.oldNotifications)
            $scope.oldNotificationsNum = $scope.oldNotifications.length;
        },function(err){
            console.log('error')
        })
            
            
        }

          $scope.removeNotification = function(id){
        notificationsService.removeNotification(id).then(function(response){
            $scope.oldNotifications = response.data.data;
            $scope.oldNotificationsNum = $scope.oldNotificationsNum-1;
            $scope.getOldNotifications();
        },function(err){
            console.log('error')
        })
            
            
        } 
    
    
    
    
    
    
    
    
    
    
    
  $scope.get = function(){
        console.log('getting data');
        Service.getUserPosts($scope.username).then(function(response){
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

    
    
    
    
    
      $scope.getProfileImage  =function(){       //get profile image , dop ,pob and job
            alert('getting user data');
            authService.getProfileImage($scope.username).then(function(response){
                console.log(response.data.data);
                $scope.i = response.data.data.profileImage;
                $scope.job = response.data.data.job;
                $scope.POB = response.data.data.placeOfbirth;
                var temp = new Date(response.data.data.dateOfbirth);
                $scope.DOB = temp.toLocaleDateString();
                alert($scope.DOB);
                
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
  
      
    $scope.like = function(id,post,likes,disLikes,to){
        var data = {post:post, likes:likes+1, disLikes:disLikes};
        Service.addLiker(id,{liker:$scope.username}).then(function(response){
            
            Service.likeDisLike(id,data).then(function(response){
                $scope.get();
            });
//            notificationsService.postNotification({from:privService.getUser(),to:to,action:'like',post:post}).then(function(res){
                
//                Service.emitNotification($scope.socket,privService.getUser(),to,'like',post);
            
            
                
//            })
            
            
              

  
            
            
            
        })
        
    }
    
     $scope.disLike = function(id,post,likes,disLikes,to){
        var data = {post:post, likes:likes, disLikes:disLikes+1};
        Service.addDisLiker(id,{"disLiker":$scope.username}).then(function(response){
           
            Service.likeDisLike(id,data).then(function(response){
                 $scope.get();
            });
//            Service.emitNotification($scope.socket,privService.getUser(),to,'disLike',post);
//            notificationsService.postNotification({from:privService.getUser(),to:to,action:'disLike',post:post});
           
            
            
            
        })
        
    }
     
     
     $scope.getComments = function(id){

         Service.getComments(id).then(function(response){
             $scope.comments=response.data.data.comments;

             
         })
         
         
         
     }
     
     
     $scope.addComment= function(id, comment){
         var data = {comment:comment};

         
         Service.addComment(id,data).then(function(response){
             
             $scope.getComments(id);
         }, function(err){
             console.log('error'+err);
             
         });
         
         
         
     }
     
     
     $scope.follow = function(u){
         
         var follower = {follower:privService.getUser()}
         console.log(u);
         console.log(follower.follower);
         
         
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
