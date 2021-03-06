var path = require('path'),
rootPath = path.normalize(__dirname + '/..'),
env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    baseURL:"http://localhost:3000/",
    app: {
      name: 'url-shortener'
    },
    db: "mongodb://localhost/url-shortener",
    dbOptions:{
        "socketTimeoutMS": 240000,
        "keepAlive": 10000,
        "connectTimeoutMS" : 30000
    }
  },
  production :{
    root: rootPath,
    baseURL:"https://url-shortener-au.herokuapp.com/",
    app: {
      name: 'url-shortener'
    },
    db: "mongodb+srv://admin:admin@cluster0-x5tfa.mongodb.net/test?retryWrites=true/url-shortener",
    dbOptions:{
        "socketTimeoutMS": 240000,
        "keepAlive": 10000,
        "connectTimeoutMS" : 30000
    }

  }
};
module.exports = config[env];