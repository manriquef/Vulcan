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
Comments.addField(feedFlag);

Posts.addField({
  fieldName: 'dummySlug',
  fieldSchema: {
    type: String,
    optional: true,
    hidden: true // never show this
  }
});

Users.addField({
  fieldName: 'feedAccount',
  fieldSchema: {
    type: Boolean,
    optional: true,
    hidden: true // never show this
  }
});


var toTitleCase = function (str) {
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

var createPost = function (slug, postedAt, username, thumbnail) {

  const user = Users.findOne({username: username});

  var post = {
    postedAt: postedAt,
    body: Assets.getText("content/" + slug + ".md"),
    title: toTitleCase(slug.replace(/_/g, ' ')),
    dummySlug: slug,
    isFeed: true,
    userId: user._id
  };

  if (typeof thumbnail !== "undefined")
    post.thumbnailUrl = "/packages/nodepeep-seed/content/images/" + thumbnail;

  newMutation({
    collection: Posts,
    document: post,
    currentUser: user,
    validate: false
  });

};

var createComment = function (slug, username, body, parentBody) {

  const user = Users.findOne({username: username});

  var comment = {
    postId: Posts.findOne({dummySlug: slug})._id,
    userId: user._id,
    body: body,
    isFeed: true,
    disableNotifications: true
  };
  var parentComment = Comments.findOne({body: parentBody});
  if (parentComment)
    comment.parentCommentId = parentComment._id;

  newMutation({
    collection: Comments,
    document: comment,
    currentUser: user,
    validate: false
  });
};

var createFeedUsers = function () {
  console.log("*** Creating Feed Accounts ***");
  Accounts.createUser({
    username: 'GameMaster',
    email: 'gamesmaster@nodepeep.com',
    profile: {
      isFeed: true
    },
    feedAccount: true
  });
  Accounts.createUser({
    username: 'NewsMaster',
    email: 'newsmaster@nodepeep.com',
    profile: {
      isFeed: true
    },
    feedAccount: true
  });
  Accounts.createUser({
    username: 'WorldNewsMaster',
    email: 'worldnewsmaster@nodepeep.com',
    profile: {
      isFeed: true
    },
    feedAccount: true
  });
  Accounts.createUser({
    username: 'SportsMaster',
    email: 'sportsmaster@nodepeep.com',
    profile: {
      isFeed: true
    },
    feedAccount: true
  });
  Accounts.createUser({
    username: 'ScienceMaster',
    email: 'science@nodepeep.com',
    profile: {
      isFeed: true
    },
    feedAccount: true
  });
  Accounts.createUser({
    username: 'TechMaster',
    email: 'techmaster@nodepeep.com',
    profile: {
      isFeed: true
    },
    feedAccount: true
  });
  Accounts.createUser({
    username: 'ArtsMaster',
    email: 'artsmaster@nodepeep.com',
    profile: {
      isFeed: true
    },
    feedAccount: true
  });
  Accounts.createUser({
    username: 'PoliticsMaster',
    email: 'politicsmaster@nodepeep.com',
    profile: {
      isFeed: true
    },
    feedAccount: true
  });
  Accounts.createUser({
    username: 'HealthMaster',
    email: 'healthmaster@nodepeep.com',
    profile: {
      isFeed: true
    },
    feedAccount: true
  });
};

var createFeedPosts = function () {
  console.log('// inserting dummy posts');

  createPost("read_this_first", moment().toDate(), "NewsMaster", "telescope.png");

  createPost("deploying", moment().subtract(10, 'minutes').toDate(), "PoliticsMaster");

  createPost("customizing", moment().subtract(3, 'hours').toDate(), "WorldNewsMaster");

  createPost("getting_help", moment().subtract(1, 'days').toDate(), "NewsMaster", "stackoverflow.png");

  createPost("removing_getting_started_posts", moment().subtract(2, 'days').toDate(), "WorldNewsMaster");

};

/*
var createFeedComments = function () {
  console.log('// inserting dummy comments…');

  createComment("read_this_first", "NewsMaster", "What an awesome app!");
  createComment("deploying", "PoliticsMaster", "Deploy to da choppah!");

};
*/

const deleteFeedContent = function () {
  Users.remove({'profile.isFeed': true});
  Posts.remove({isFeed: true});
  Comments.remove({isFeed: true});
};

Meteor.startup(function () {
  // insert dummy content only if createFeedContent hasn't happened and there aren't any posts or users in the db
  if (!Users.find().count()) {
    createFeedUsers();
  }
  if (!Posts.find().count()) {
    createFeedPosts();
  }
/*  if (!Comments.find().count()) {
    createFeedComments();
  }*/
});
