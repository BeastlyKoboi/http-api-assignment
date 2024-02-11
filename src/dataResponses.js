const respond = (request, response, statusCode, type, content) => {
  response.writeHead(statusCode, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const validateDataType = (type) => {
  if (type === 'application/json' || type === 'text/xml') { return type; }

  return 'application/json';
};

const makeXMLString = (data) => {
  let xmlString = '<response>';

  Object.keys(data).forEach((key) => {
    xmlString += `<${key}>${data[key]}</${key}>`;
  });

  xmlString += '</response>';
  return xmlString;
};
const stringifyData = (type, data) => {
  if (type === 'text/xml') { return makeXMLString(data); }
  return JSON.stringify(data);
};

const getSuccess = (request, response, type) => {
  const data = {};
  const dataType = validateDataType(type);

  data.message = 'This is a successful response';
  const content = stringifyData(dataType, data);

  respond(request, response, 200, dataType, content);
};
const getBadRequest = (request, response, type, query) => {
  const statusCode = query.valid === 'true' ? 200 : 400;
  const data = {};
  const dataType = validateDataType(type);

  if (query.valid === 'true') { data.message = 'The request has the required parameters'; } else {
    data.message = 'Missing valid query parameter set to true';
    data.id = 'badRequest';
  }
  const content = stringifyData(dataType, data);

  respond(request, response, statusCode, dataType, content);
};
const getUnauthorized = (request, response, type, query) => {
  const statusCode = query.loggedIn === 'true' ? 200 : 401;
  const data = {};
  const dataType = validateDataType(type);

  if (query.loggedIn === 'true') { data.message = 'You have successfully viewed the content'; } else {
    data.message = 'Missing loggedIn query parameter set to yes';
    data.id = 'unauthorized';
  }
  const content = stringifyData(dataType, data);

  respond(request, response, statusCode, dataType, content);
};
const getForbidden = (request, response, type) => {
  const data = {};
  const dataType = validateDataType(type);

  data.message = 'Missing valid query parameter set to true';
  data.id = 'forbidden';
  const content = stringifyData(dataType, data);

  respond(request, response, 403, dataType, content);
};
const getInternalServerError = (request, response, type) => {
  const data = {};
  const dataType = validateDataType(type);

  data.message = 'Internal Servor Error. Something went wrong.';
  data.id = 'internalError';
  const content = stringifyData(dataType, data);

  respond(request, response, 500, dataType, content);
};
const getNotImplemented = (request, response, type) => {
  const data = {};
  const dataType = validateDataType(type);

  data.message = 'A get request for this page has not been implemented yet. Check again later for updated content.';
  data.id = 'notImplemented';
  const content = stringifyData(dataType, data);

  respond(request, response, 501, dataType, content);
};
const getNotFound = (request, response, type) => {
  const data = {};
  const dataType = validateDataType(type);

  data.message = 'The page you are looking for was not found.';
  data.id = 'notFound';
  const content = stringifyData(dataType, data);

  respond(request, response, 404, dataType, content);
};

module.exports = {
  getSuccess,
  getBadRequest,
  getUnauthorized,
  getForbidden,
  getInternalServerError,
  getNotImplemented,
  getNotFound,
};
