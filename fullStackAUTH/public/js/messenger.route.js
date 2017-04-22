var app = angular.module("app.messenger", ["ngRoute", "authModule", "tokenModule","privModule","chattingModule"]);

app.config(function($routeProvider) {
  $routeProvider.when("/messenger", {
    templateUrl: "/views/messenger.tpl.html",
    controller: "messengerCtrl"
  });
});

app.controller("messengerCtrl", function($scope, authService, $location, tokenService, privService, chattingService) {
    
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
    
    
    //chatting jquery
    
    $scope.getUsers = function(){
        authService.getUsers().then(function(response){
           $scope.users= response.data.data;
            console.log($scope.users);
            
        },function(response){
            
        })
        
    }
    
    var message={};
    $scope.getselectedUser=function(selectedusername){
        $scope.selectedUser = selectedusername;
        console.log("sender:"+privService.getUser()+" reciever:"+selectedusername);
        message.push('sender':privService.getUser(), 'reciever':selectedusername);
    }
    
    $scope.getMessages = function(){
        
        console.log(message);
        
        
    }

});
