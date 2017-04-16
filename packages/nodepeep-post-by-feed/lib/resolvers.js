import { GraphQLSchema, Utils } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';

/*
const specificResolvers = {
  Post: {
    user(post, args, context) {
      return context.Users.findOne({ _id: post.userId }, { fields: context.getViewableFields(context.currentUser, context.Users) });
    },
  },
  Mutation: {
    increasePostViewCount(root, { postId }, context) {
      return context.Posts.update({_id: postId}, { $inc: { viewCount: 1 }});
    }
  }
};

GraphQLSchema.addResolvers(specificResolvers);
*/
const resolvers = {

  list: {

    name: 'feedsList',

    check(user, terms, collection) {
      const {selector} = collection.getParameters(terms);
      const status = _.findWhere(collection.statuses, {value: selector.status || 2});
      return Users.canDo(user, `feeds.view.${status.label}.all`);
    },

    resolver(root, {terms}, context, info) {
      let {selector, options} = context.Feeds.getParameters(terms);
      options.limit = (terms.limit < 1 || terms.limit > 100) ? 100000 : terms.limit;
      options.skip = terms.offset;
      options.fields = context.getViewableFields(context.currentUser, context.Feeds);

      Utils.performCheck(this, context.currentUser, terms, context.Feeds);

      return context.Feeds.find(selector, options).fetch();
    },

  },

  single: {

    name: 'feedsSingle',

    check(user, document, collection) {
      if (!document) return false;
      const status = _.findWhere(collection.statuses, {value: document.status});
      return Users.owns(user, document) ? Users.canDo(user, `feeds.view.${status.label}.own`) : Users.canDo(user, `feeds.view.${status.label}.all`);
    },

    resolver(root, {documentId, slug}, context) {

      const selector = documentId ? {_id: documentId} : {'slug': slug};
      const feed = context.Feeds.findOne(selector);

      Utils.performCheck(this, context.currentUser, feed, context.Feeds);

      return context.Users.keepViewableFields(context.currentUser, context.Feeds, feed);
    },

  },

  total: {

    name: 'feedsTotal',

    resolver(root, {terms}, context) {
      const {selector} = context.Feeds.getParameters(terms);
      return context.Feeds.find(selector).count();
    },

  }
};

export default resolvers;
