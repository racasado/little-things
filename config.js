var config = (process.env.NODE_ENV === 'production') ? {
    endpoint: 'micappital.appspot.com',
    client: 'micappital_pro'
  } : {
    endpoint: 'localhost:8081',
    client: 'micappital'
  };

module.exports = config;
