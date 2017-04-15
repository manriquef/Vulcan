import { registerFragment } from 'meteor/vulcan:lib';

// ------------------------------ Vote ------------------------------ //

// note: fragment used by default on the UsersProfile fragment
registerFragment(`
  fragment UsersCurrent on User {
    _id
    username
    avatar
    createdAt
    isAdmin
    displayName
    email
    emailHash
    slug
    groups
    services
  }
`);
