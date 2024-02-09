const http = require('http');
const url = require('url');
const htmlHandler = require('./htmlResponses.js');
const dataHandler = require('./dataResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    '/success': dataHandler.getSuccess,
    // '/badRequest': ,
    // '/unauthorized': ,
    // '/forbidden': ,
    // '/internal': ,
    // '/notImplemented': ,
    // '/notFound': ,
    notFound: htmlHandler.getIndex,

};

const onRequest = (request, response) => {
    const parsedUrl = url.parse(request.url);
    // console.log(parsedUrl);
    // console.log(parsedUrl.pathname);

    const acceptedTypes = request.headers.accept.split(',');

    const handler = urlStruct[parsedUrl.pathname];

    if (handler) {
        handler(request, response, acceptedTypes[0]);
    }
    else {
        urlStruct['notFound'](request, response);
    }
};

http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1: ${port}`);
});