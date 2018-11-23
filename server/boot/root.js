module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = new server.loopback.Router();
  router.get('/', server.loopback.status());
  server.use(router);
};
