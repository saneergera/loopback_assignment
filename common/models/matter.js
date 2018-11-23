module.exports = function(Matter) {

  'use strict';

  const logger = require('../../helpers/logger').getLogger('common/models/matter.js');
  const getMatterData = require("./matter/getMatterData.js");

  /*
   *
   * Get Matter Details API
   *
   */
  Matter.remoteMethod('getMatterData', getMatterData.config);
  Matter.getMatterData = getMatterData.function;

};
