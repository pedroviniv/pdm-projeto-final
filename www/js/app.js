var mainApp = angular.module('main', [
  'ionic',
  'controllers'
  ]
);

mainApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

mainApp.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('home', {
    url: '/home',
    abstract: true,
    templateUrl: 'states/home.html'
  })

  .state('home.decoracoes', {
    url: '/decoracoes',
    views: {
      'decoracoes-tab': {
        templateUrl: 'states/tabs/decoracoes.html',
        controller: 'decoracoesCtrl'
      }
    },
    cache: true
  })

  .state('home.favoritos', {
    url: '/favoritos',
    views: {
      'favoritos-tab': {
        templateUrl: 'states/tabs/favoritos.html',
        controller: 'decoracoesCtrl'
      }
    },
    cache: false
  })

  .state('detalhes', {
    url: '/detalhes',
    templateUrl: 'states/detalhes.html',
    controller: 'decorationDetailCtrl',
    cache: false,
    params: {
      'selected': null
    }
  })

  

  $urlRouterProvider.otherwise('/home/decoracoes');
});


