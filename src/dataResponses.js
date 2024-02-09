const respond = (request, response, content, type) => {
    response.writeHead(200, { 'Content-Type': type });
    response.write(content);
    response.end();
};

const makeJSONString = (data) => {
    return JSON.stringify(data);
};
const makeXMLString = (data) => {
    let xmlString = '<response>';

    for (let key in data) {
        xmlString += `<${key}>${data[key]}</${key}>`;
    } 

    xmlString += `</response>`;
    return xmlString;
};
const stringifyData = (type, data) => {
    if (type == 'application/json')
        return makeJSONString(data);
    if (type == 'text/xml')
        return makeXMLString(data);
};

const getSuccess = (request, response, type) => {
    let data = {};
    data.message = 'This is a successful response';

    let content = stringifyData(type, data);

    respond(request, response, content, type);
};
const getBadRequest = (request, response, type, query) => {

};
const getUnauthorized = (request, response, type, query) => {

};
const getForbidden = (request, response, type, query) => {

};
const getInternal = (request, response, type, query) => {

};
const getNotImplemented = (request, response, type, query) => {

};
const getNotFound = (request, response, type, query) => {

};

module.exports = {
    getSuccess,
};
