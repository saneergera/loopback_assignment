"use strict";

const app = require("../../../server/server");
const Q = require("q");

module.exports = {
  config: {
    http: {
      path: "",
      verb: "get",
      status: 200,
      error: 404
    },
    description: "retrieve matter data",
    accepts: {
      arg: "matterId",
      type: "number",
      required: true
    },
    returns: {
      type: "object",
      root: true
    }
  },
  function: (reqMatterId, callback) => {
    const Matters = app.models.Matter;
    const MatterTasks = app.models.MatterTask;
    const MatterTaskComments = app.models.MatterTaskComment;
    const Client = app.models.Client;
    const Group = app.models.Group;
    const output = {};

    let deferredMatters = Q.defer();
    Matters.findById(reqMatterId, deferredMatters.makeNodeResolver());

    deferredMatters.promise.then(result => {
      let matter_result = result;
      output["matterId"] = matter_result.matterId;
      output["matterName"] = matter_result.matterName;
      output["estimatedFee"] = matter_result.estimatedFee;
      output["clientId"] = matter_result.estimatedFee;

      let deferredClient = Q.defer();
      Client.findById(result.clientId, deferredClient.makeNodeResolver());
      deferredClient.promise.then(result => {
        let client_result = result;
        output["clientName"] = client_result.clientName;

        let deferredGroup = Q.defer();
        Group.findById(result.groupId, deferredGroup.makeNodeResolver());
        deferredGroup.promise.then(result => {
          const group_result = result;
          output["groupName"] = group_result.groupName;
          output["country"] = matter_result.country;
          output["state"] = matter_result.state;
          output["city"] = matter_result.city;
          output["additionalFields"] = matter_result.additionalFields;

          let deferredTask = Q.defer();
          MatterTasks.find(
            { where: { matterId: matter_result.matterId } },
            deferredTask.makeNodeResolver()
          );
          deferredTask.promise.then(async result => {
            var task_array = result;
            console.log(task_array);
            var tasks = task_array.map(element => {
              console.log("------------------------");
              console.log(element);
              const {
                matterTemplateId,
                matterTemplateTaskId,
                classificationId,
                timestampActivate,
                timestampDeactivate,
                ...newData
              } = element.__data;

              return newData;
            });

            var index = 0;

            for (const element of tasks) {
              var deferredComment = Q.defer();
              const a = await MatterTaskComments.find({
                where: { matterTaskId: element.matterTaskId }
              });
              var comments = a.map(ele => {
                const { entryTimestamp, ...newData } = ele.__data;

                return newData;
              });

              tasks[index]["comments"] = comments;
              index++;
            }
            output["tasks"] = tasks;

            callback(null, output);
          });
        });
      });
    });
  }
};
