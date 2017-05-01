var app = angular.module("app.feeds", ["ngRoute", "requestsModule", "privModule", "tokenModule", "authModule"]);

app.config(function($routeProvider) {
  $routeProvider.when("/feeds", {
    templateUrl: "/views/feeds.tpl.html",
    controller: "feedsCtrl"
  });
});

app.controller("feedsCtrl", function($scope, Service, privService, tokenService,authService, $location) {
    

  
    
    
});
