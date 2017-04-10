import Users from 'meteor/vulcan:users';

const membersActions = [
  "posts.report",
  "posts.cancelReport",
  "comments.report",
  "comments.cancelReport"
];
Users.groups.members.can(membersActions);
