import app from './app';

app.config(($stateProvider, $urlRouterProvider) => {
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'routes/home.html',
    controller: 'homeController'
  })
  .state('redirector', {
      url: '/:id',
      templateUrl: 'routes/redirector.html',
      controller: 'redirectorController'
  });
});
