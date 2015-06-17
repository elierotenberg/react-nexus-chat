import express from 'express';
import favicon from 'serve-favicon';
import Nexus from 'react-nexus';
import React from 'react';
import jsesc from 'jsesc';
import cors from 'cors';
import { resolve } from 'url';
import _ from 'lodash';
const __DEV__ = process.env.NODE_ENV === 'development';

import { analytics, APP_ROOT_ID, DEFAULT_CLIENT_ID, render } from './config';
const { protocol, port, host } = render;

import App from './components/App';

const root = `${protocol}://${host}:${port.public}`;
const r = (t) => resolve(root, t);
const rFavicon = r('/favicon.ico');
const rClient = r('/c.js');
const rJSON2 = r('/json2.min.js');
const rSemantic = r('/semantic.min.css');
const rCSS = r('/c.css');

function handleError(res) {
  return (err) => {
    res.status(500);
    if(__DEV__) {
      res.type('text/plain').send(err.stack);
    }
    else {
      res.json({ err: err.message });
    }
  };
}

function mountAppCode({ appRootID, data }) {
  return `
    ;(function(data, appRootID) {
      window.startReactNexusChat(data, document.getElementById(appRootID));
    })(JSON.parse('${jsesc(JSON.stringify(data))}'), JSON.parse('${jsesc(JSON.stringify(appRootID))}'))
  `;
}

const stylesheets = {
  'semantic': rSemantic,
  'react-nexus-chat-css': rCSS,
};

express()
.use(favicon(`${__dirname}/../public/favicon.ico`))
.use(express.static(`${__dirname}/../public`))
.use(cors())
.get('/', (req, res) => {
  const clientID = DEFAULT_CLIENT_ID;
  const appRootID = APP_ROOT_ID;
  Nexus.renderToString(<App clientID={clientID} req={req} />)
  .then(({ html, data }) => res.status(200).send(`<!doctype html><html>
    <head>
      <meta charset="utf-8">
      <meta charset="X-UA-Compatible" content="IE=edge,chrome=1">
      <title>React Nexus Chat</title>
      <meta name="description" content="The *famous* React Nexus Chat">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <link rel="icon" href="${rFavicon}" type="image/x-icon">
      ${_.map(stylesheets, (href, id) => `<link id="${id}" rel="stylesheet" href="${href}">`).join('\n')}
    </head>
    <body>
      <div id="${jsesc(appRootID)}">${html}</div>
      <script src="${jsesc(rJSON2)}"></script>
      <script src="${jsesc(rClient)}"></script>
      <script>
        ${mountAppCode({ appRootID, data })}
      </script>
      <script>
        (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
        function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
        e=o.createElement(i);r=o.getElementsByTagName(i)[0];
        e.src='//www.google-analytics.com/analytics.js';
        r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
        ga('create','${jsesc(analytics.UA)}','auto');ga('send','pageview');
      </script>
    </body>
  </html>`))
  .catch(handleError(res));
})
.listen(port.private);
