import Users from 'meteor/vulcan:users';

const guestsActions = [
  'feeds.view',
];
Users.groups.guests.can(guestsActions);

const adminActions = [
  'feeds.view',
  'feeds.new',
  'feeds.edit.all',
  'feeds.remove.all',
];
Users.groups.admins.can(adminActions);
