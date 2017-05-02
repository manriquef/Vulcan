import { newMutation } from 'meteor/vulcan:core';
import moment from 'moment';
import Posts from 'meteor/vulcan:posts';
import Users from 'meteor/vulcan:users';
import { Accounts } from 'meteor/accounts-base';

const dummyFlag = {
  fieldName: 'isDummy',
  fieldSchema: {
    type: Boolean,
    optional: true,
    hidden: true
  }
}

Users.addField(dummyFlag);
Posts.addField(dummyFlag);


var toTitleCase = function (str) {
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};


const createUser = function (username, email) {
  const user = {
    username,
    email,
    isDummy: true
  };
  newMutation({
    collection: Users,
    document: user,
    validate: false
  });
}

var createDummyUsers = function () {
  console.log('// inserting dummy users…');
  createUser('NewsMaster', 'newsmaster@nodepeep.com');
  createUser('GamesMaster', 'gamesmaster@nodepeep.com');
  createUser('WorldNewsMaster', 'worldnewsmaster@nodepeep.com');
  createUser('TechMaster', 'tech@nodepeep.com');
  createUser('SportsMaster', 'sportsmaster@nodepeep.com');
  createUser('ScienceMaster', 'sciencemaster@nodepeep.com');
};

Meteor.startup(function () {
  // insert dummy content only if createFeedContent hasn't happened and there aren't any posts or users in the db
  if (!Users.find().count()) {
    createDummyUsers();
  }

});
