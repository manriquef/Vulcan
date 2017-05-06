import { registerFragment, getFragment  } from 'meteor/vulcan:core';

registerFragment(`
  fragment FeedsNew on Feed {
    _id
    title
    url
    userId
    user {
      _id
      slug
      avatar
      username
      displayName
      isDummy
    }
    categories
    {
      _id
      name
      slug
    }
  }
`);
