var app = angular.module("app.signin", ["ngRoute", "authModule", "tokenModule"]);

app.config(function($routeProvider) {
  $routeProvider.when("/signin", {
    templateUrl: "/views/signin.tpl.html",
    controller: "signinCtrl"
  });
});

app.controller("signinCtrl", function($scope, authService, $location, tokenService, privService) {
  $scope.userinput = {};
  $scope.signin = function() {
    authService.postSignin($scope.userinput).then(function(response) {
      tokenService.setToken(response.data.token);
      privService.setUser(response.data.user);
      $location.path("/feeds");
    }, function(response) {
      console.log(response.status);
        if(response.status==404){
            $('#signinUsername').css('border','solid red 1px');
            
        }
        else if(response.status==403){
            $('#signinPassword').css('border','solid red 1px');
            
        }
    });
  }
        $scope.userInput = {};
  $scope.signup = function() {
    authService.postSignup($scope.userInput).then(function(response) {
      alert("You have signed up for an account , please signin");
        $scope.userInput = {};
        $scope.confirmPassword = "";
    }, function(response) {
      console.log(response.status);
        if(response.status == 409){
            $('#username').css('border','solid red 1px');
        }
    });
  }
});
