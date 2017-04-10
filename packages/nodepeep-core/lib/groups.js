import Users from 'meteor/vulcan:users';

/*
  Let's create a new "mods" group that can edit and delete any posts
*/

Users.createGroup("pmember");
Users.createGroup("mods");
Users.createGroup("supermods");

const pmemberActions = [
   "categories.new"
];

const modsActions = [
  "categories.edit.own",
  "posts.view.pending.all",
  "posts.view.rejected.all",
  "posts.view.spam.all",
  "posts.view.deleted.all",
  "posts.warn"
];

const superModsActions = [
  "categories.edit.own",
  "posts.view.pending.all",
  "posts.view.rejected.all",
  "posts.view.spam.all",
  "posts.view.deleted.all",
  "posts.warn"
];

Users.groups.pmember.can(pmemberActions);
Users.groups.mods.can(modsActions);
Users.groups.supermods.can(superModsActions);
