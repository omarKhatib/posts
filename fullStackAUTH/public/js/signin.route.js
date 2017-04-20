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
      $location.path("/home");
    }, function(response) {
      console.log(response.status);
    });
  }
});
