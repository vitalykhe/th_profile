const router = require('./router.js');

// 1. create WEB SERVER

const http = require('http');
http.createServer((request, response) => {
  if (request.url === '/favicon.ico') {
    response.writeHead(200, {'Content-Type': 'image/x-icon'} );
    response.end();
    //console.log('favicon requested');
    return;
  } else {
    router.home(request, response);
    router.user(request, response);
  }
}).listen(1337, '127.0.0.1');

console.log('Server is running at http://127.0.0.1:1337');



// 2. Handle http request - route GET and POST:



// if url ==="/" && GET then show search

// if url ==="/" && POST then redirect to /:username





// 3. If url ==="/" " anything" get json from server. on end show profile. on error show error



// 4. create functions that work with files
// read from file and get a string , merge files
