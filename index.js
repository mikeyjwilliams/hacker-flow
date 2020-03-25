/** @format */

const port = process.env.PORT;
const server = require('./server');

server.listen(port, () => {
  console.log(`\n *** http://localhost:${port} *** \n`);
});
