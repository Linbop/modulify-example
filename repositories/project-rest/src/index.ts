import http from 'http';
import demoClient from './clients/demo';

const requestListener = async function (req: any, res: any) {
  if (req.url === '/favicon.ico') {
    res.end();
    return;
  }

  const result = await new Promise((resolve, reject) => demoClient.getMessage({}, function(err, response) {
    if(err) {
      return reject(err)
    }
    resolve(response)
  }))

  res.writeHead(200);
  res.end(JSON.stringify(result));
};

const server = http.createServer(requestListener);
server.listen(3001);