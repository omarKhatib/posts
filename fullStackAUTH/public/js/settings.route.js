var app = angular.module("app.settings", ["ngRoute", "requestsModule", "privModule", "tokenModule", "authModule"]);

app.config(function($routeProvider) {
  $routeProvider.when("/settings", {
    templateUrl: "/views/settings.tpl.html",
    controller: "settingsCtrl"
  });
});

app.controller("settingsCtrl", function($scope, Service, privService, tokenService,authService, $location) {
    
      $scope.todoItems = [];
  $scope.userinput = {};
        var tags = [];
    
    
    
    
});