"use strict";

require("6to5/polyfill");
var Promise = require("bluebird");

// Escape double-quotes
/* jshint ignore:start */
var X = function (x) {
  return x.replace(/\"/g, "\\\"");
};
var DEV = (process.env.NODE_ENV === "development");

module.exports = function (_ref) {
  var title = _ref.title;
  var description = _ref.description;
  var canonical = _ref.canonical;
  var lang = _ref.lang;
  var rootHtml = _ref.rootHtml;
  var serializedFlux = _ref.serializedFlux;
  var serializedHeaders = _ref.serializedHeaders;
  return "<!doctype html" + (lang ? " lang=\"" + X(lang) + "\"" : "") + ">\n  <html>\n    <head>\n      <meta charset=\"utf-8\">\n      <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n      " + (description ? "<meta name=\"description\" content=\"" + X(description) + "\">" : "") + "\n      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n      <title>" + (title || "") + "</title>\n      <link rel=\"stylesheet\" type=\"text/css\" href=\"/p" + (DEV ? "" : ".min") + ".css\">\n    </head>\n    <body>\n      <div id=\"__ReactNexusRoot\">\n        " + rootHtml + "\n      </div>\n      <script type=\"text/javascript\">\n        (function(w, d, i, f, h, g) {\n          w.__ReactNexus = { serializedFlux: f, serializedHeaders: h, guid: g, rootElement: d.getElementById(i) };\n        }(window, document, '__ReactNexusRoot', '" + serializedFlux + "', '" + serializedHeaders + "', '" + guid + "'))\n      </script>\n    </body>\n  </html>\n  ";
};
/* jshint ignore:end */
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImc6L3JlYWN0LW5leHVzL3JlYWN0LW5leHVzLXN0YXJ0ZXJraXQvc3JjL3RlbXBsYXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ3pCLElBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQzs7OztBQUlwQyxJQUFNLENBQUMsR0FBRyxVQUFDLENBQUM7U0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFLLENBQUM7Q0FBQSxDQUFDO0FBQ3pDLElBQUksR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssYUFBYSxDQUFDLENBQUM7O0FBRW5ELE1BQU0sQ0FBQyxPQUFPLEdBQUc7TUFBRyxLQUFLLFFBQUwsS0FBSztNQUFFLFdBQVcsUUFBWCxXQUFXO01BQUUsU0FBUyxRQUFULFNBQVM7TUFBRSxJQUFJLFFBQUosSUFBSTtNQUFFLFFBQVEsUUFBUixRQUFRO01BQUUsY0FBYyxRQUFkLGNBQWM7TUFBRSxpQkFBaUIsUUFBakIsaUJBQWlCOzRCQUNqRixDQUFBLElBQUksZ0JBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFNLEVBQUUsQ0FBQSx3SUFLM0MsQ0FBQSxXQUFXLDZDQUF3QyxDQUFDLENBQUMsV0FBVyxDQUFDLFdBQU8sRUFBRSxDQUFBLHdHQUduRSxLQUFLLElBQUksRUFBRSw2RUFDNkIsQ0FBQSxHQUFHLEdBQUcsRUFBRSxHQUFFLE1BQU0sQ0FBQSx1RkFJN0QsUUFBUSw2UUFNaUMsY0FBYyxZQUFPLGlCQUFpQixZQUFPLElBQUk7Q0FJakcsQ0FBQyIsImZpbGUiOiJ0ZW1wbGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJzZ0bzUvcG9seWZpbGwnKTtcbmNvbnN0IFByb21pc2UgPSByZXF1aXJlKCdibHVlYmlyZCcpO1xuXG4vLyBFc2NhcGUgZG91YmxlLXF1b3Rlc1xuLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuY29uc3QgWCA9ICh4KSA9PiB4LnJlcGxhY2UoL1xcXCIvZywgJ1xcXFxcIicpO1xubGV0IERFViA9IChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKHsgdGl0bGUsIGRlc2NyaXB0aW9uLCBjYW5vbmljYWwsIGxhbmcsIHJvb3RIdG1sLCBzZXJpYWxpemVkRmx1eCwgc2VyaWFsaXplZEhlYWRlcnMgfSkgPT5cbiAgYDwhZG9jdHlwZSBodG1sJHtsYW5nID8gYCBsYW5nPVwiJHtYKGxhbmcpfVwiYCA6ICcnfT5cbiAgPGh0bWw+XG4gICAgPGhlYWQ+XG4gICAgICA8bWV0YSBjaGFyc2V0PVwidXRmLThcIj5cbiAgICAgIDxtZXRhIGh0dHAtZXF1aXY9XCJYLVVBLUNvbXBhdGlibGVcIiBjb250ZW50PVwiSUU9ZWRnZVwiPlxuICAgICAgJHtkZXNjcmlwdGlvbiA/IGA8bWV0YSBuYW1lPVwiZGVzY3JpcHRpb25cIiBjb250ZW50PVwiJHtYKGRlc2NyaXB0aW9uKX1cIj5gIDogJyd9XG4gICAgICA8bWV0YSBuYW1lPVwidmlld3BvcnRcIiBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTFcIj5cbiAgICAgIDx0aXRsZT4ke3RpdGxlIHx8IFwiXCJ9PC90aXRsZT5cbiAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBocmVmPVwiL3Ake0RFViA/ICcnOiAnLm1pbid9LmNzc1wiPlxuICAgIDwvaGVhZD5cbiAgICA8Ym9keT5cbiAgICAgIDxkaXYgaWQ9XCJfX1JlYWN0TmV4dXNSb290XCI+XG4gICAgICAgICR7cm9vdEh0bWx9XG4gICAgICA8L2Rpdj5cbiAgICAgIDxzY3JpcHQgdHlwZT1cInRleHQvamF2YXNjcmlwdFwiPlxuICAgICAgICAoZnVuY3Rpb24odywgZCwgaSwgZiwgaCwgZykge1xuICAgICAgICAgIHcuX19SZWFjdE5leHVzID0geyBzZXJpYWxpemVkRmx1eDogZiwgc2VyaWFsaXplZEhlYWRlcnM6IGgsIGd1aWQ6IGcsIHJvb3RFbGVtZW50OiBkLmdldEVsZW1lbnRCeUlkKGkpIH07XG4gICAgICAgIH0od2luZG93LCBkb2N1bWVudCwgJ19fUmVhY3ROZXh1c1Jvb3QnLCAnJHtzZXJpYWxpemVkRmx1eH0nLCAnJHtzZXJpYWxpemVkSGVhZGVyc30nLCAnJHtndWlkfScpKVxuICAgICAgPC9zY3JpcHQ+XG4gICAgPC9ib2R5PlxuICA8L2h0bWw+XG4gIGA7XG4vKiBqc2hpbnQgaWdub3JlOmVuZCAqL1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9