import Users from 'meteor/vulcan:users';

const guestsActions = [
  'feeds.view',
];
Users.groups.guests.can(guestsActions);

const adminActions = [
  'feeds.view',
  'feeds.new',
  'feeds.edit',
  'feeds.delete',
];
Users.groups.admins.can(adminActions);
