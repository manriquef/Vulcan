import Users from 'meteor/vulcan:users';
import { hasReported } from './helpers.js';
import { runCallbacks, runCallbacksAsync } from 'meteor/vulcan:core';
import update from 'immutability-helper';

// The equation to determine reporting power. Defaults to returning 1 for everybody
export const getReportPower = function (user) {
  return 1;
};

const keepReportProperties = item => _.pick(item, '__typename', '_id', 'reporters', 'reports', 'reportBaseScore');

/*

Runs all the operation and returns an objects without affecting the db.

*/
export const operateOnItem = function (collection, originalItem, user, operation, isClient = false) {

  user = typeof user === "undefined" ? Meteor.user() : user;

  let item = {
    reports: 0,
    reporters: [],
    reportBaseScore: 0,
    ...originalItem,
  };

  const reportPower = getReportPower(user);
  const hasReportedItem = hasReported(user, item);
  const collectionName = collection._name;
  const canDo = Users.canDo(user, `${collectionName}.${operation}`);

  // make sure item and user are defined, and user can perform the operation
  if (
    !item ||
    !user ||
    !canDo ||
    operation === "report" && hasReportedItem ||
    operation === "cancelReport" && !hasReportedItem
  ) {
    throw new Error(`Cannot perform operation "${collectionName}.${operation}"`);
  }

  // ------------------------------ Sync Callbacks ------------------------------ //

  item = runCallbacks(operation, item, user, operation, isClient);

  /*

  reporters arrays have different structures on client and server:

  - client: [{__typename: "User", _id: 'foo123'}]
  - server: ['foo123']

  */

  const reporter = isClient ? {__typename: "User", _id: user._id} : user._id;
  const filterFunction = isClient ? u => u._id !== user._id : u => u !== user._id;

  switch (operation) {

    case "report":
      if (hasReportedItem) {
        operateOnItem(collection, item, user, "cancelReport", isClient);
      }

      item = update(item, {
        reporters: {$push: [reporter]},
        reports: {$set: item.reports + 1},
        reportBaseScore: {$set: item.reportBaseScore + reportPower},
      });

      break;

    case "cancelReport":
      item = update(item, {
        reporters: {$set: item.reporters.filter(filterFunction)},
        reports: {$set: item.reports - 1},
        reportBaseScore: {$set: item.reportBaseScore -  reportPower},
      });
      break;
  }

  // console.log('new item', item);

  return item;
};

/*

Call operateOnItem, update the db with the result, run callbacks.

*/
export const mutateItem = function (collection, originalItem, user, operation) {
  const newItem = operateOnItem(collection, originalItem, user, operation, false);
  newItem.inactive = false;

  collection.update({_id: newItem._id}, newItem, {bypassCollection2:true});

  // --------------------- Server-Side Async Callbacks --------------------- //
  runCallbacksAsync(operation+".async", newItem, user, collection, operation);

  return newItem;
}
