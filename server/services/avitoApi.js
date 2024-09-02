const axios = require('axios');
require('dotenv').config();

exports.getAvitoToken = async (clientId, clientSecret) => {
  try {
    const response = await axios.post('https://api.avito.ru/token', {
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'client_credentials'
    });

    return response.data.access_token;
  } catch (error) {
    console.error('Failed to get Avito token:', error.response ? error.response.data : error.message);
    return null;
  }
};
