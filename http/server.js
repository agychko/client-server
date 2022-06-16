const http = require('http');

const options = {
  host: '127.0.0.1',
  port: '8080',
  path: '/',
};
let body = '';

const server = http.createServer((request, response) => {
  console.log(`Client connected. Method: ${request.method}`);
  const messages = body.split(', ');
  request.on('data', (chunk) => {
    let msg = '';
    msg += chunk.toString();
    switch (request.method) {
      case 'POST':
        body += ` ${msg},`;
        console.log(`Server got message: ${msg}`);
        break;
      case 'PUT':
        body = `${msg},`;
        console.log(`Server got message: ${msg}`);
        break;
      case 'PATCH':
        messages.forEach((item, index, array) => {
          if (item !== msg) {
            array.splice(index, 1, msg);
          }
          if (item === '') {
            array.splice(index, 1);
          }
        });
        body = messages.join(', ');
        console.log(`Server got message: ${msg}`);
        break;
      default:
        console.log('Not implemented');
        break;
    }
  });
  request.on('end', () => {
    response.end(body);
    console.log('client disconnected');
  });
});
server.listen(options, () => {
  console.log(`Server is listening and running on http://${options.host}:${options.port}${options.path}`);
});
