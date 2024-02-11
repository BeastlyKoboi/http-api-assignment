const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const dataHandler = require('./dataResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  '/success': dataHandler.getSuccess,
  '/badRequest': dataHandler.getBadRequest,
  '/unauthorized': dataHandler.getUnauthorized,
  '/forbidden': dataHandler.getForbidden,
  '/internal': dataHandler.getInternalServerError,
  '/notImplemented': dataHandler.getNotImplemented,
  '/notFound': dataHandler.getNotFound,
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const handler = urlStruct[parsedUrl.pathname];
  const queryParams = query.parse(parsedUrl.query);
  let acceptedTypes;

  if (!request.headers.accept) { acceptedTypes = ['application/json']; } else { acceptedTypes = request.headers.accept.split(','); }

  if (handler) { handler(request, response, acceptedTypes[0], queryParams); } else { urlStruct['/notFound'](request, response, acceptedTypes[0], queryParams); }
};

http.createServer(onRequest).listen(port, () => {
  // console.log(`Listening on 127.0.0.1: ${port}`);
});
