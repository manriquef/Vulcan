import { registerFragment } from 'meteor/vulcan:core';

// ------------------------------ Vote ------------------------------ //

// note: fragment used by default on the UsersProfile fragment
registerFragment(`
  fragment VotedItem on Vote {
    # vulcan:voting
    itemId
    power
    votedAt
  }
`);

// ------------------------------ Reporting ------------------------------ //

// note: fragment used by default on the Reporting fragment
registerFragment(`
  fragment ReportedItem on Report {
    # nodepeep:report
    itemId
    power
    reportedAt
  }
`);

// ------------------------------ Users ------------------------------ //

// note: fragment used by default on UsersProfile, PostsList & CommentsList fragments
registerFragment(`
  fragment UsersMinimumInfo on User {
    # vulcan:users
    _id
    slug
    avatar
    username
    displayName
    emailHash
    isFeed
  }
`);

registerFragment(`
  fragment UsersProfile on User {
    # vulcan:users
    ...UsersMinimumInfo
    createdAt
    isAdmin
    bio
    htmlBio
    twitterUsername
    website
    groups
    karma
    # vulcan:posts
    postCount
    # vulcan:comments
    commentCount
    # vulcan:newsletter
    newsletter_subscribeToNewsletter
    # vulcan:notifications
    notifications_users
    notifications_posts
    # vulcan:voting
    downvotedComments {
      ...VotedItem
    }
    downvotedPosts {
      ...VotedItem
    }
    upvotedComments {
      ...VotedItem
    }
    upvotedPosts {
      ...VotedItem
    }
    reportedPosts{
      ...ReportedItem
    }
    reportedComments{
      ...ReportedItem
    }
  }
`);

// ------------------------------ Categories ------------------------------ //

// note: fragment used by default on CategoriesList & PostsList fragments
registerFragment(`
  fragment CategoriesMinimumInfo on Category {
    # vulcan:categories
    _id
    name
    slug
  }
`);

registerFragment(`
  fragment CategoriesList on Category {
    # vulcan:categories
    ...CategoriesMinimumInfo
    description
    rules
    order
    image
    parentId
    parent {
      ...CategoriesMinimumInfo
    }
  }
`);

// ------------------------------ Posts ------------------------------ //

registerFragment(`
  fragment PostsList on Post {
    # vulcan:posts
    _id
    title
    url
    slug
    feedId
    postedAt
    createdAt
    sticky
    status
    body
    htmlBody
    isFeed
    excerpt
    viewCount
    clickCount
    # vulcan:users
    userId
    user {
      ...UsersMinimumInfo
    }
    # vulcan:embedAPI
     thumbnailUrl
    # vulcan:categories
    categories {
      ...CategoriesMinimumInfo
    }
    # vulcan:comments
    commentCount
    commenters {
      ...UsersMinimumInfo
    }
    # vulcan:voting
    upvoters {
      _id
    }
    downvoters {
      _id
    }
    upvotes
    downvotes
    baseScore
    score
    reports
    reporters {
      _id
    }
    reportBaseScore
    reportScore
  }
`);

registerFragment(`
  fragment PostsPage on Post {
    ...PostsList
  }
`);


// ----------------------------- Comments ------------------------------ //

registerFragment(`
  fragment CommentsList on Comment {
    # vulcan:comments
    _id
    postId
    parentCommentId
    topLevelCommentId
    body
    htmlBody
    postedAt
    # vulcan:users
    userId
    user {
      ...UsersMinimumInfo
    }
    # vulcan:posts
    post {
      _id
      commentCount
      commenters {
        ...UsersMinimumInfo
      }
    }
    # vulcan:voting
    upvoters {
      _id
    }
    downvoters {
      _id
    }
    upvotes
    downvotes
    baseScore
    score
    reports
    reporters {
      _id
    }
    reportBaseScore
    reportScore
  }
`);
