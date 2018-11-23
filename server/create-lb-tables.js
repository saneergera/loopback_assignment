'use strict';

// Run 'node server/create-lb-tables' from the root directory to migrate the built-in loopback models to the database

let server = require('./server');
let ds = server.dataSources.macMysql;
let lbTables = ['ACL'];

ds.automigrate(lbTables, er => {
  if (er) { throw er; }
  console.log('Loopback tables [' + lbTables + '] created in ', ds.adapter.name);
  ds.disconnect();
});