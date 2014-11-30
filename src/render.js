const cors = require('cors');
const express = require('express');
const path = require('path');

const App = require('./App');

module.exports = () => {
  const render = express()
  .use(cors())
  .use(express.static(path.join(__dirname, '..', 'public')))
  .get('/favicon.ico', (req, res) => res.status(404).send(null))
  .use((new App()).prerender);

  return render;
};
