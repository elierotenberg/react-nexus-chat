import express from 'express';
import favicon from 'serve-favicon';
import { Lifespan } from 'nexus-flux';
import Nexus from 'react-nexus';
import React from 'react';
import jsesc from 'jsesc';
import cors from 'cors';
import { resolve } from 'url';

import { analytics, MODULE_NAME, DEFAULT_CLIENT_ID, INT_MAX, render } from './config';
const { protocol, port, host } = render;

import ChatApp from './components/ChatApp';

const components = {
  ChatApp,
};

const root = `${protocol}://${host}:${port}`;
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

function mountAppCode({ componentName, appRootID, data, props }) {
  return `
    window[JSON.parse('${jsesc(JSON.stringify(MODULE_NAME))}')][JSON.parse('${JSON.stringify(jsesc(componentName))}')]({
      container: document.getElementById(JSON.parse('${jsesc(JSON.stringify(appRootID))}')),
      data: JSON.parse('${jsesc(JSON.stringify(data))}'),
      props: JSON.parse('${jsesc(JSON.stringify(props))}'),
    });
  `;
}

const stylesheets = {
  'semantic': rSemantic,
  'react-nexus-chat-css': rCSS,
};

const loadStylesheetsCode = _.map(stylesheets, (url, id) => `
    (function(href, id) {
      if(!document.getElementById(id)) {
        var link = document.createElement('link');
        link.id = id;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = href;
        document.getElementsByTagName('head')[0].appendChild(link);
      }
    }(JSON.parse('${jsesc(JSON.stringify(url))}'), JSON.parse('${jsesc(JSON.stringify(id))}')))
`).join(',\n');

express()
.use(favicon(`${__dirname}/public/favicon.ico`))
.use(express.static(`${__dirname}/public`))
.use(cors())
// Example: /page/CommentsClient?props={threadId:1337}&__clientId=Client3253151
// Loads a full page containing only the component
.get('/page/:componentName', (req, res) =>
  Promise.try(() => {
    const { componentName } = req.params;
    const clientID = req.query.__clientId || DEFAULT_CLIENT_ID;
    const appRootID = req.query.__appRootId || _.uniqueId(`Client${_.random(1, INT_MAX - 1)}`);
    const props = JSON.parse(req.query.props || '{}');
    const lifespan = new Lifespan();
    if(!_.has(components, componentName)) {
      return res.status(404).end();
    }
    const App = components[componentName];
    const nexus = App.createNexus({ req }, clientID, lifespan);
    return Nexus.prerenderApp(<App {...props} />, nexus)
    .then(([html, data]) => {
      lifespan.release();
      const { title, description } = App.getRoutes({ req })[0];
      res.status(200).send(
        `<!doctype html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta charset="X-UA-Compatible" content="IE=edge,chrome=1">
          <title>${jsesc(title)}</title>
          <meta name="description" content="${jsesc(description)}">
          <meta name="viewport" content="width=device-width,initial-scale=1">
          <link rel="icon" href="${rFavicon}" type="image/x-icon">
          ${_.map(stylesheets, (href, id) => `<link id="${id}" rel="stylesheet" href="${href}">`).join('\n')}
        </head>
        <body>
          <div id="${jsesc(appRootID)}">${html}</div>
          <script src="${jsesc(rJSON2)}"></script>
          <script src="${jsesc(rClient)}"></script>
          <script>
            ${mountAppCode({ componentName, appRootID, data, props })}
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
        </html>`
      );
    });
  })
  .catch(handleError(res))
)
// Example: /iframe/CommentsClient?props={threadId:12234}&__clientId=23523
// Loads the given component into an iframe
.get('/iframe/:componentName', (req, res) =>
  Promise.try(() => {
    const { componentName } = req.params;
    if(!_.has(components, componentName)) {
      return res.status(404).end();
    }
    const { originalUrl } = req;
    const iframe = '/iframe';
    const page = '/page';
    const sourceUrl = resolve(root, page + originalUrl.substring(iframe.length));
    res.status(200).send(`<iframe src="${jsesc(sourceUrl)}"></iframe>`);
  })
  .catch(handleError(res))
)
// Example: /fragment/CommentsClient?props={threadId:124124214}&__clientId=13532&__appRootId=99325
// Loads the given component into an inline HTML fragment
.get('/fragment/:componentName', (req, res) =>
  Promise.try(() => {
    const { componentName } = req.params;
    const clientID = req.query.__clientId || DEFAULT_CLIENT_ID;
    const appRootID = req.query.__appRootId || _.uniqueId(`Client${_.random(1, INT_MAX - 1)}`);
    const props = JSON.parse(req.query.props || '{}');
    const lifespan = new Lifespan();
    if(!_.has(components, componentName)) {
      return res.status(404).end();
    }
    const App = components[componentName];
    const nexus = App.createNexus({ req }, clientID, lifespan);
    return Nexus.prerenderApp(<App {...props} />, nexus)
    .then(([html, data]) => {
      lifespan.release();
      // const { title, description } = App.getRoutes({ req })[0];
      res.status(200).send(`
        <div id="${jsesc(appRootID)}">${html}</div>
        <script src="${rJSON2}"></script>
        <script src="${rClient}"></script>
        <script>
          ${mountAppCode({ componentName, appRootID, data, props })}
          ${loadStylesheetsCode}
        </script>
      `);
    });
  })
  .catch(handleError(res))
)
// Example: /json/CommentsClient?props={threadId:124124214}&__clientId=13532&__appRootId=99325
// Loads the given component into an JSON object { html, css }
.get('/json/:componentName', (req, res) =>
  Promise.try(() => {
    const { componentName } = req.params;
    const clientID = req.query.__clientId || DEFAULT_CLIENT_ID;
    const appRootID = req.query.__appRootId || _.uniqueId(`Client${_.random(1, INT_MAX - 1)}`);
    const props = JSON.parse(req.query.props || '{}');
    const lifespan = new Lifespan();
    if(!_.has(components, componentName)) {
      return res.status(404).end();
    }
    const App = components[componentName];
    const nexus = App.createNexus({ req }, clientID, lifespan);
    return Nexus.prerenderApp(<App {...props} />, nexus)
    .then(([html, data]) => {
      lifespan.release();
      res.status(200).json({
        html: `
          <div id="${jsesc(appRootID)}">${html}</div>
          <script src="${rJSON2}"></script>
          <script src="${rClient}"></script>
          <script>
            ${mountAppCode({ componentName, appRootID, data, props })}
          </script>
        `,
        css: _.values(stylesheets),
      });
    });
  })
  .catch(handleError(res))
)
.listen(port);
