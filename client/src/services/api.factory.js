import app from '../app';

app.constant('URL_PARTS', {
  SERVER: 'http://localhost:3000/',
  API_ENDPOINT: 'api/url/'
});

app.factory('urlapi', (URL_PARTS, $http) => {
  let URL = {};

  URL.getUrl = (id) => {
    return $http.get(`${URL_PARTS.SERVER}${URL_PARTS.API_ENDPOINT}${id}`);
  };

  URL.saveUrl = (url) => {
    let req = {
      method: 'POST',
      url: `${URL_PARTS.SERVER}${URL_PARTS.API_ENDPOINT}`,
      data: {
        url : url
      }
    };
    return $http(req);    
  };

  return URL;
});
