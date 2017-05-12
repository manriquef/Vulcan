import { registerFragment } from 'meteor/vulcan:lib';

// note: fragment used by default on the UsersProfile fragment
registerFragment(`
  fragment UsersCurrent on User {
    _id
    username
    createdAt
    isAdmin
    displayName
    email
    emailHash
    slug
    groups
    services
    avatar
    avatarUrl
  }
`);
