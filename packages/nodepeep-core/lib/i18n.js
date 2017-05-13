/*
  Let's add an international label to the field added in custom_fields.js
*/

import { addStrings } from 'meteor/vulcan:core';

addStrings('en', {
  "posts.color": "Color", // add a new one (collection.field: "Label")
  "posts.sponsored": "Sponsored Post",
  "posts.reported_posts": "Reported Posts",
  "posts.reported_users": "Reported Users",
  "posts.reported_comments": "Reported Comments",
  "posts.userUpvotedPosts": "Up Voted Posts",
  "posts.userDownvotedPosts": "Down Voted Posts",
  "users.catmod": "Category Moderator",
  "users.please_log_in_to_report": "Please log in to report"
});
