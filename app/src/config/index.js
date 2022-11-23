const convict = require('convict');

const app = require('./configs/app');
const jwt = require('./configs/jwt');
const bcrypt = require('./configs/bcrypt');

// Define a schema
const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  app,
  jwt,
  bcrypt
});
 
// Load environment dependent configuration
const env = config.get('env');
// config.load(config);

// Perform validation
config.validate({allowed: 'strict'});

module.exports = config;