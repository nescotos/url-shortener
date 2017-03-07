module.exports = {
  PORT : process.env.PORT || 3000,
  DATABASE : {
    HOST: 'mongodb://localhost:27017/',
    NAME: 'urlshortener'
  }
};
