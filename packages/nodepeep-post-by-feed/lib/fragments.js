/*import { registerFragment, getFragment  } from 'meteor/vulcan:core';

registerFragment(`
  fragment FeedsList on Feed {
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
    createdFromSettings
    subjectToParsingErrors
  }
`);

registerFragment(`
  fragment FeedsPage on Feed {
    ...FeedsList
  }
`);
*/
