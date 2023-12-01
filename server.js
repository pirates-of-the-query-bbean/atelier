const path = require('path');
const express = require('express');
const axios = require('axios');
require('dotenv').config();
const app = express();
app.use(express.static(path.join(__dirname, '/client/dist')));
// other configuration...
console.log('ENV', process.env);

app.all('/*', (req, res) => {
  console.log('method', req.method, 'url ', req.url);
  axios({
    method: req.method,
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp${req.url}`,
    headers: {
      Authorization: process.env.REACT_APP_API_KEY,
    },
  }).then((result) => {
    console.log('RESULT DATA IS', result.data[0]);
    res.send(result.data);
  }).catch((err) => {
    console.error('The Error is', err);
    res.send(err)
  });
});
console.log('Listening on port 3000');
app.listen(3000);
