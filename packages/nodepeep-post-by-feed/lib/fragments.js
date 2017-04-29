/*

Register the GraphQL fragment used to query for data

*/

import { registerFragment, getFragment  } from 'meteor/vulcan:core';

registerFragment(`
  fragment FeedsList on Feed {
    # vulcan:posts
    _id
    title
    url
    user{
      _id
      slug
      avatar
      username
      displayName
      emailHash
      isFeed
    }
    categories
    {
      _id
      name
      slug
    }
    createdFromSettings
    subjectToParsingErrors
  }
`);

registerFragment(`
  fragment FeedsPage on Feed {
    ...FeedsList
  }
`);
