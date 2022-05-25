const os = require("os");

var freememory = os.freemem();
var totalmemory = os.totalmem();
console.log(freememory);
console.log(totalmemory);

const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello Kelvin");
    res.end;
  } else if (req.url === "api/courses") {
    res.write(JSON.stringify([1, 2, 3, 4]));
  }
});
// server.on('connection', (socket) => {
//     console.log('New Connection....')
// })

server.listen(3000);
console.log("Listening on port 3000");
