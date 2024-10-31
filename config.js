const dotenv = require('dotenv'); 
require('dotenv').config();

const config = Object.freeze({
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI 
});

// Export the config for use in other parts of the application  
module.exports = {  
  config  
};