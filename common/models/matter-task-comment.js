module.exports = function(MatterTaskComment) {

  const app = require("../../server/server");
  const Q = require("q");

  MatterTaskComment.remoteMethod('commentsWithName', {
    'http': {
      'path': '/commentsWithName',
      'verb': 'get',
      'status': 200,
      'error': 400
    },
    'description': "Returns list of comments for specific matter with commenter's name",
    'accepts': {
      'arg': 'matterId',
      'type': 'number',
      'required': true
    },
    'returns': {
      'type': 'array',
      'root': true,
    }
  });

  function attachNameToComment(comment) {
    var defer = Q.defer();
    const User = app.models.ServzoUser;

    const filterForUser = {
      'fields': {
        'firstName': true,
        'lastName': true,
        'id': true
      }
    };

    User.findById(comment.createdByUserId, filterForUser)
      .then(function(user) {
        var commentWithName = comment;
        if (user) {
          commentWithName.createdByUser = user.firstName + ' ' + user.lastName.slice(0, 1);
        } else {
          commentWithName.createdByUser = 'Unknown User';
        }
        defer.resolve(commentWithName);
      })
      .catch(function(err) {
        defer.reject(err);
      });
    return defer.promise;
  }

  MatterTaskComment.commentsWithName = function(matterId, callback) {

    const fieldsListMatterTaskComments = {
      'where': {
        'matterId': matterId
      },
      'fields': {
        'matterTaskCommentId': true,
        'matterId': true,
        'matterTaskId': true,
        'text': true,
        'entryTimestamp': true,
        'createdByUserId': true
      }
    };

    MatterTaskComment.find(fieldsListMatterTaskComments)
      .then(function(MatterTaskComments) {
        callback(null, MatterTaskComments);
      })
      .catch(function(MatterTaskCommentsErr) {
        callback(MatterTaskCommentsErr);
      });

  };

  MatterTaskComment.remoteMethod('createComment', {
    'http': {
      'path': '/commentsWithName',
      'verb': 'post',
      'status': 201,
      'error': 400
    },
    'description': "Creates a comment and returns created comment with commenter's name",
    'accepts': {
      'arg': 'data',
      'type': 'object',
      'required': true,
      'http': {
        'source': 'body'
      }
    },
    'returns': {
      'type': 'object',
      'root': true,
    },
  });

  MatterTaskComment.createComment = function(requestedData, callback) {
    MatterTaskComment
      .create(requestedData)
      .then(function(createdComment) {
        attachNameToComment(createdComment)
          .then(function(commentWithName) {
            callback(null, commentWithName);
          })
          .catch(function(err) {
            callback(err);
          });
      })
      .catch(function(err) {
        callback(err);
      });
  };

};
