const http = require('http');

const options = {
  method: 'Get',
  hostname: '127.0.0.1',
  port: '8080',
  path: '/',
};

const req = http.request(options, (res) => {
  const chunks = [];

  res.on('data', (chunk) => {
    chunks.push(chunk);
  });

  res.on('end', () => {
    const body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();
