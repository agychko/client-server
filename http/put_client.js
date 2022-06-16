const http = require('http');

const options = {
  method: 'Put',
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
function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

const items = ['1 potato', '2 potato', '3 potato', '4', '5 potato', '6 potato', '7 potato', 'more!'];
const msg = randomItem(items);

req.write(msg);
req.end();
