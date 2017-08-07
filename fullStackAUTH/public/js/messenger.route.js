var app = angular.module("app.messenger", ["ngRoute","authModule", "tokenModule","privModule","chattingModule","notificationsModule"]);

app.config(function($routeProvider) {
  $routeProvider.when("/messenger", {
    templateUrl: "/views/messenger.tpl.html",
    controller: "messengerCtrl"
  });
});

app.controller("messengerCtrl", function($scope,Service, authService, $location, tokenService, privService, chattingService,notificationsService) {
    
    //chatting jquery
    $('.chat[data-chat=person2]').addClass('active-chat');
$('.person[data-chat=person2]').addClass('active');

$('.left .person').mousedown(function(){
    if ($(this).hasClass('.active')) {
        return false;
    } else {
        var findChat = $(this).attr('data-chat');
        var personName = $(this).find('.name').text();
        $('.right .top .name').html(personName);
        $('.chat').removeClass('active-chat');
        $('.left .person').removeClass('active');
        $(this).addClass('active');
        $('.chat[data-chat = '+findChat+']').addClass('active-chat');
    }
});
      $scope.socket = {};
    $scope.messages = [];
    $scope.username = privService.getUser();
    
    $scope.notifications =[];
    
    $scope.loadConnectionNT = function() {
    
  
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
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
          $scope.loadConnectionCH = function() {
    $scope.socket = chattingService.connect();
    chattingService.getChat($scope.socket, function(data) {
        console.log('new data');
      console.log(data);
      $scope.messages.push(data);
      $scope.$apply();
    });
  };

    
    
    //chatting jquery

    $scope.getUsers = function(){
        authService.getUsers().then(function(response){
           $scope.users= response.data.data;
            console.log($scope.users);
            
        },function(response){
            
        })
        
    }
    
    
    
    $scope.getProfileImage  =function(){       //get profile image , dop ,pob and job
            
            authService.getProfileImage($scope.username).then(function(response){

                $scope.i = response.data.data.profileImage;
                $scope.job = response.data.data.job;
                $scope.POB = response.data.data.placeOfbirth;
                 $scope.followers = response.data.data.followers;
             $scope.following = response.data.data.following;
                var temp = new Date(response.data.data.dateOfbirth);
                $scope.DOB = temp.toLocaleDateString();
                
                
            }, function(response){
                console.log('error in getting user data')
                
            })
            
            
            
            
            
        }

    
    
    
    
    
    var message;
    $scope.getselectedUser=function(selectedusername){
        
        $scope.selectedUser = selectedusername;
        
        message = {sender:$scope.username,reciever:selectedusername};
        
        $scope.getMessages(message);
         var element = document.getElementById("t");
    element.scrollTop = element.scrollHeight; //make scroll on bottom after sending new message 
    }
    

    
    $scope.getMessages = function(message){
        chattingService.getMessages(message).then(function(response){
            
        $scope.oldMessages = response.data.data;
      
//            if($scope.messages.sender== message.sender){
//                alert(message.sender)
//                $scope.senderMessages = response.data.data;
//            }
//            else{
//                $scope.recieverMessages = response.data.data;
//                console.log($scope.recieverMessages);
//            }
            
            
        });
        
        
    }
    
    $scope.sendMessage = function(){
        message.message = $scope.message;
        console.log(message);
        chattingService.postMessage(message).then(function(response){ chattingService.emitChat($scope.socket,message.sender,message.reciever,message.message);
                                                                     
notificationsService.postNotification({from:message.sender,to:message.reciever,action:'message',post:message.message});
                
 Service.emitNotification($scope.socket,message.sender,message.reciever,'message',message.message);                                                                 
                                                                     
                                                                     
                                                                     
 var element = document.getElementById("t");
    element.scrollTop = element.scrollHeight; //make scroll on bottom after sending new message 
                     $scope.message = "";
//            $scope.messages.push(message);
            console.log($scope.messages);
            
        })
        
    }

});
