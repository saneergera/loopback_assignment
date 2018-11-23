// Run 'node server/discover_and_create_model' from the root directory to create model.json for table that is already present in remote database schema.
var path = require('path');
var fs = require('fs');
var app = require(path.resolve(__dirname, '../server/server'));
var outputPath = path.resolve(__dirname, '../common/models');

var dataSource = app.dataSources['default'];

function schemaCB(err, schema) {
  if (schema) {
    console.log("Auto discovery success: " + schema.name);
    var outputName = outputPath + '/' + schema.name + '.json';
    fs.writeFile(outputName, JSON.stringify(schema, null, 2), function(err1) {
      if (err1) {
        console.log(err1);
      } else {
        console.log("JSON saved to " + outputName);
      }
    });
  }
  if (err) {
    console.error(err);
    return;
  }
  return;
}

dataSource.discoverSchema('meeting', { 'schema': 'lawzo' }, schemaCB);
