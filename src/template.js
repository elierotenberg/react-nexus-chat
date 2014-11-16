
// Escape double-quotes
/* jshint ignore:start */
const X = (x) => x.replace(/\"/g, '\\"');
let DEV = (process.env.NODE_ENV === 'development');

module.exports = ({ title, description, canonical, lang, rootHtml, serializedFlux, serializedHeaders }) =>
  `<!doctype html${lang ? ` lang="${X(lang)}"` : ''}>
  <html>
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      ${description ? `<meta name="description" content="${X(description)}">` : ''}
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>${title || ""}</title>
      <link rel="stylesheet" type="text/css" href="/p${DEV ? '': '.min'}.css">
    </head>
    <body>
      <div id="__ReactNexusRoot">
        ${rootHtml}
      </div>
      <script type="text/javascript">
        (function(w, d, i, f, h, g) {
          w.__ReactNexus = { serializedFlux: f, serializedHeaders: h, guid: g, rootElement: d.getElementById(i) };
        }(window, document, '__ReactNexusRoot', '${serializedFlux}', '${serializedHeaders}', '${guid}'))
      </script>
    </body>
  </html>
  `;
/* jshint ignore:end */
