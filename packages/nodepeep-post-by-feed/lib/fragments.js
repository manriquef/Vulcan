/*

Register the GraphQL fragment used to query for data

*/

import { registerFragment, getFragment } from 'meteor/vulcan:core';


registerFragment(`
  fragment FeedsList on Feed {
    # vulcan:posts
    _id
    title
    url
    categories{
      _id
      name
      slug
      description
      order
      image
      parentId
    }
  }
`);

registerFragment(`
  fragment FeedsPage on Feed {
    ...FeedsList
  }
`);
