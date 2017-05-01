import { newMutation } from 'meteor/vulcan:core';
import moment from 'moment';
import Posts from "meteor/vulcan:posts";
import Comments from "meteor/vulcan:comments";
import Users from 'meteor/vulcan:users';
import Events from "meteor/vulcan:events";

const feedFlag = {
  fieldName: 'isFeed',
  fieldSchema: {
    type: Boolean,
    optional: true,
    hidden: true
  }
}


Users.addField(feedFlag);
Posts.addField(feedFlag);


var toTitleCase = function (str) {
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

var createFeedUsers = function () {
  console.log("*** Creating Feed Accounts ***");
  Accounts.createUser({
    username: 'GameMaster',
    email: 'gamesmaster@nodepeep.com',
    profile: {
      isFeed: true
    },
  });
  Accounts.createUser({
    username: 'NewsMaster',
    email: 'newsmaster@nodepeep.com',
    profile: {
      isFeed: true
    },
  });
  Accounts.createUser({
    username: 'WorldNewsMaster',
    email: 'worldnewsmaster@nodepeep.com',
    profile: {
      isFeed: true
    },
  });
  Accounts.createUser({
    username: 'SportsMaster',
    email: 'sportsmaster@nodepeep.com',
    profile: {
      isFeed: true
    },
  });
  Accounts.createUser({
    username: 'ScienceMaster',
    email: 'science@nodepeep.com',
    profile: {
      isFeed: true
    },
  });
  Accounts.createUser({
    username: 'TechMaster',
    email: 'techmaster@nodepeep.com',
    profile: {
      isFeed: true
    },
  });
  Accounts.createUser({
    username: 'ArtsMaster',
    email: 'artsmaster@nodepeep.com',
    profile: {
      isFeed: true
    },
  });
  Accounts.createUser({
    username: 'PoliticsMaster',
    email: 'politicsmaster@nodepeep.com',
    profile: {
      isFeed: true
    },
  });
  Accounts.createUser({
    username: 'HealthMaster',
    email: 'healthmaster@nodepeep.com',
    profile: {
      isFeed: true
    },
  });
};


const deleteFeedContent = function () {
  Users.remove({'profile.isFeed': true});
  Posts.remove({isFeed: true});
};

Meteor.startup(function () {
  // insert dummy content only if createFeedContent hasn't happened and there aren't any posts or users in the db
  if (!Users.find().count()) {
    createFeedUsers();
  }

});
