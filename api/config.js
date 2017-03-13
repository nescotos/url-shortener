module.exports = {
  HOST : 'http://localhost:3000/?#!/',
  PORT : process.env.PORT || 3030,
  DATABASE : {
    HOST: 'mongodb://localhost:27017/',
    NAME: 'urlshortener'
  },
  URLPAGINATION: 50,
  SUPPORTED_PROTOCOLS: ['http', 'https', 'ftp']
};
