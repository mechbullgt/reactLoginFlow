const config = require('nconf');

config.argv()
 .env()
 .file({ file: './envConfig.json' });

module.exports= config;