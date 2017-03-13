import app from '../app';

app.controller('redirectorController', (urlapi, $scope, $stateParams, $window) => {

  urlapi.getUrl($stateParams.id).then((response) => {
    if(response.data.status){
      $scope.loading = true;
      $window.location.href = response.data.url;
    }else{
      $scope.errorMessage = '404 - URL Not Found :(';
    }
  });
});
