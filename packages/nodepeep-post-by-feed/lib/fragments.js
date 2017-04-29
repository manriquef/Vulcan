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
    userId
    categories
    createdFromSettings
    subjectToParsingErrors
  }
`);

registerFragment(`
  fragment FeedsPage on Feed {
    ...FeedsList
  }
`);
