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

export const createDummyUsers = function () {
  console.log('*** Inserting dummy users…');
  createUser('NewsMaster', 'newsmaster@nodepeep.com');
  createUser('GamesMaster', 'gamesmaster@nodepeep.com');
  createUser('WorldNewsMaster', 'worldnewsmaster@nodepeep.com');
  createUser('TechMaster', 'techmaster@nodepeep.com');
  createUser('SportsMaster', 'sportsmaster@nodepeep.com');
  createUser('ScienceMaster', 'sciencemaster@nodepeep.com');
};
