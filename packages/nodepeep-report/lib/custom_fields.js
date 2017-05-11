import SimpleSchema from 'simpl-schema';
import Users from "meteor/vulcan:users";
import Posts from "meteor/vulcan:posts";
import Comments from "meteor/vulcan:comments";

/**
 * @summary Report schema
 * @type {SimpleSchema}
 */
const reportSchema = new SimpleSchema({
  itemId: {
    type: String
  },
  power: {
    type: Number,
    optional: true
  },
  reportedAt: {
    type: Date,
    optional: true
  }
});

Users.addField([
  /**
    An array containing comments upvotes
  */
  {
    fieldName: 'reportedComments',
    fieldSchema: {
      type: Array,
      optional: true,
      viewableBy: ['guests'],
      resolveAs: 'reportedComments: [Report]',
    }
  },
  {
    fieldName: 'reportedComments.$',
    fieldSchema: {
      type: reportSchema,
      optional: true
    }
  },
  /**
    An array containing posts upvotes
  */
  {
    fieldName: 'reportedPosts',
    fieldSchema: {
      type: Array,
      optional: true,
      viewableBy: ['guests'],
      resolveAs: 'reportedPosts: [Report]',
    }
  },
  {
    fieldName: 'reportedPosts.$',
    fieldSchema: {
      type: reportSchema,
      optional: true
    }
  },
]);

Posts.addField([
  /**
    How many upvotes the post has received
  */
  {
    fieldName: "reports",
    fieldSchema: {
      type: Number,
      optional: true,
      viewableBy: ['guests'],
    }
  },
  /**
    An array containing the `_id`s of the post's upvoters
  */
  {
    fieldName: "reporters",
    fieldSchema: {
      type: Array,
      optional: true,
      viewableBy: ['guests'],
      resolveAs: 'reporters: [User]',
    }
  },
  /**
    The post's base score (not factoring in the post's age)
  */
  {
    fieldName: "reportBaseScore",
    fieldSchema: {
      type: Number,
      optional: true,
      viewableBy: ['guests'],
    }
  },
  /**
    The post's current score (factoring in age)
  */
  {
    fieldName: "reportScore",
    fieldSchema: {
      type: Number,
      optional: true,
      viewableBy: ['guests'],
    }
  },
]);

Comments.addField([
  /**
    The number of upvotes the comment has received
  */
  {
    fieldName: "reports",
    fieldSchema: {
      type: Number,
      optional: true,
      viewableBy: ['guests'],
    }
  },
  /**
    An array containing the `_id`s of upvoters
  */
  {
    fieldName: "reporters",
    fieldSchema: {
      type: Array,
      optional: true,
      viewableBy: ['guests'],
      resolveAs: 'reporters: [User]',
    }
  },
  /**
    The comment's base score (not factoring in the comment's age)
  */
  {
    fieldName: "reportBaseScore",
    fieldSchema: {
      type: Number,
      optional: true,
      viewableBy: ['guests'],
    }
  },
  /**
    The comment's current score (factoring in age)
  */
  {
    fieldName: "reportScore",
    fieldSchema: {
      type: Number,
      optional: true,
      viewableBy: ['guests'],
    }
  },
]);
