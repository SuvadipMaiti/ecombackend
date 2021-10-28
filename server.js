const http = require('http');

const app = require('./app');

const port = 3000;

const server = http.createServer(app);

// const server = http.createServer(function(req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     var message = 'It works!\n',
//         version = 'NodeJS ' + process.versions.node + '\n',
//         response = [message, version].join('\n');
//     res.end(response);
// });


server.listen(port);

