describe('Testing url API using the client', () => {
  let URL;
  let $httpBackend;
  let address = 'http://localhost:3000/api/url/';

  beforeEach(angular.mock.module('url-shortener'));

  beforeEach(inject((_$httpBackend_, _urlapi_) => {
    $httpBackend = _$httpBackend_;
    URL = _urlapi_;
    $httpBackend.whenGET(`${address}fg`)
      .respond({
        status: true,
        message: 'Enjoy you URL',
        url: 'helloworld.com'
      });
    $httpBackend.whenPOST(`${address}`)
      .respond({
        status: true,
        message: 'Shorten Correctly',
        shortenUrl: 'simplfr.cc/os'
      });
  }));

  it('URLAPI should be defined', () => {
    expect(URL).toBeDefined();
  });

  it('GET /api/url/fg should return a valid url', () => {
    URL.getUrl('fg').then((response) => {
      response = response.data;
      expect(response.status).toBeTruthy();
      expect(response.message).toEqual('Enjoy you URL');
      expect(response.url).toEqual('helloworld.com');
    });
  });

  it('POST /api/url should insert an URL correctly', () => {
    URL.saveUrl('http://www.facebook.com/post/videos/858as').then((response) => {
      response = response.data;
      expect(response.status).toBeTruthy();
      expect(response.message).toEqual('Shorten Correctly');
      expect(response.shortenUrl).toEqual('simplfr.cc/os');
    });
  });
});
