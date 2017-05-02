import { registerFragment, getFragment  } from 'meteor/vulcan:core';

registerFragment(`
  fragment FeedsList on Feed {
    # vulcan:posts
    _id
    title
    url
    userId
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
