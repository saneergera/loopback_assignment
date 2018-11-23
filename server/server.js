var loopback = require('loopback');
var boot = require('loopback-boot');
var morgan = require('morgan');
var http = require('http');
var https = require('https');
var logger = require('../helpers/logger').getLogger('server');

var app = module.exports = loopback();

app.use(morgan('dev'));
app.use(require('express-status-monitor')()); //https://github.com/RafalWilinski/express-status-monitor

app.start = function(httpsMode) {
  if (httpsMode === undefined) {
    httpsMode = process.env.HTTPS;
  }
  var server = null;
  if (httpsMode) {
    //SSL configuration
    var options = {};
    server = https.createServer(options, app);
  } else {
    server = http.createServer(app);
  }
  server.listen(app.get('port'), function() {
    var baseUrl = (httpsMode ? 'https://' : 'http://') + app.get('host') + ':' + app.get('port');
    app.emit('started', baseUrl);
    logger.warn('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      logger.debug('Browse your REST API at %s%s', baseUrl, explorerPath);
      logger.info('Check the application\'s performace at: %s', baseUrl + '/status');
    }
  });
  return server;
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) {
    throw err;
  }

  // start the server if `$ node server.js`
  if (require.main === module)
    {
      app.start();
    }
});