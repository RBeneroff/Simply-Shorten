(function() {
  angular
    .module('Site', ['ui.router'])
    .config(MainRouter);

    MainRouter.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

    function MainRouter($stateProvider, $urlRouterProvider, $locationProvider) {
      $stateProvider
      .state('body', {
        url: '/',
        templateUrl: 'body.html'
      })

      $urlRouterProvider.otherwise('/');

      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });

    } //MainRouter
})() //IIFE
