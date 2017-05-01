import { addCallback, runCallbacksAsync, Utils } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import Posts from 'meteor/vulcan:posts';
import Comments from 'meteor/vulcan:comments';
import { operateOnItem, getReportPower } from './report.js';
import { reportScore } from './scoring.js';

/*

### posts.new.sync

- PostsNewUpvoteOwnPost

### comments.new.sync

- CommentsNewUpvoteOwnComment

### upvote.async
### downvote.async
### cancelUpvote.async
### cancelDownvote.async

- updateItemScore
- updateUser
- updateKarma

### posts.new.async
### comments.new.async

- UpvoteAsyncCallbacksAfterDocumentInsert

*/


// ----------------------------- vote.async ------------------------------- //

/**
 * @summary Update an item's (post or comment) score
 * @param {object} item - The item being operated on
 * @param {object} user - The user doing the operation
 * @param {object} collection - The collection the item belongs to
 * @param {string} operation - The operation being performed
 */
function updateItemScore(item, user, collection, operation, context) {
  reportScore({collection: collection, item: item, forceUpdate: true});
}

addCallback("report.async", updateItemScore);
addCallback("cancelReport.async", updateItemScore);


/**
 * @summary Update the profile of the user doing the operation
 * @param {object} item - The item being operated on
 * @param {object} user - The user doing the operation
 * @param {object} collection - The collection the item belongs to
 * @param {string} operation - The operation being performed
 */
function updateUser(item, user, collection, operation, context) {

  // uncomment for debug
  // console.log(item);
  // console.log(user);
  // console.log(collection._name);
  // console.log(operation);

  const update = {};
  const reportPower = getReportPower(user);
  const report = {
    itemId: item._id,
    votedAt: new Date(),
    power: reportPower
  };

  const collectionName = Utils.capitalize(collection._name);

  switch (operation) {
    case "report":
      update.$addToSet = {[`reported${collectionName}`]: report};
      break;
    case "cancelReport":
      update.$pull = {[`reported${collectionName}`]: {itemId: item._id}};
      break;
  }

  Users.update({_id: user._id}, update);

}

addCallback("report.async", updateUser);
addCallback("cancelReport.async", updateUser);


/**
 * @summary Update the karma of the item's owner
 * @param {object} item - The item being operated on
 * @param {object} user - The user doing the operation
 * @param {object} collection - The collection the item belongs to
 * @param {string} operation - The operation being performed
 */
function updateKarma(item, user, collection, operation, context) {

  const reportPower = getReportPower(user);
  const karmaAmount = (operation === "report" || operation === "cancelReport") ? reportPower : -reportPower;

  // only update karma is the operation isn't done by the item's author
  if (item.userId !== user._id) {
    Users.update({_id: item.userId}, {$inc: {"karma": karmaAmount}});
  }

}

addCallback("report.async", updateKarma);
addCallback("cancelReport.async", updateKarma);


// ----------------------- posts.new.async --------------------------------- //
// ----------------------- comments.new.async ------------------------------ //

/**
 * @summary Run the "upvote.async" callbacks *once* the item exists in the database
 * @param {object} item - The item being operated on
 * @param {object} user - The user doing the operation
 * @param {object} collection - The collection the item belongs to
 */
function ReportAsyncCallbacksAfterDocumentInsert(item, user, collection) {
  runCallbacksAsync("report.async", item, user, collection, 'report');
}
