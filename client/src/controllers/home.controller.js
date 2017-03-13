import app from '../app';

app.controller('homeController', (urlapi, $scope) => {

  $scope.shortUrl = () => {
    $scope.shortenUrl = "";
    $scope.message = "";
    $scope.errorMessage = "";
    urlapi.saveUrl($scope.url).then((response) => {
      if(response.data.status || response.data.message == "Duplicated URL"){
        $scope.shortenUrl = response.data.shortenUrl;
        $scope.message = response.data.message;
      }else{
        $scope.errorMessage = data.message;
      }
    }, (error) => {
      $scope.errorMessage = error.data.message;
    });
  };

});
