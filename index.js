const history = require('connect-history-api-fallback');
const exStatic = require('express-static');
const app = require('express')();
const program = require('commander');
const path = require('path');

program
  .version('0.0.1')
	.option('-S, --single-page-application', 'run as a SPA server')
  .option('-s, --src <string>', 'source path [./]', './')
  .option('-h, --host <string>', 'host [127.0.0.1]', '127.0.0.1')
  .option('-p, --port <number>', 'port [3000]', 3000)
  .parse(process.argv);

/**
 * make absolute path
 */
if (!path.isAbsolute(program.src)) {
	program.src = path.resolve(program.src)
}

/**
 * run as a SPA server
 */
if (program.singlePageApplication) {
	console.log('run as a SPA server');
	app.use(history());
}

/**
 * start static file server
 */
app.use(exStatic(program.src));

const server = app.listen(program.port, program.host, function() {
	console.log('source path: %s', program.src);
	console.log('server is running at %s:%s', server.address().address, server.address().port);
});
