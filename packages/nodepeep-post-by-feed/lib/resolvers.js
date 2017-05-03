import { GraphQLSchema, Utils } from 'meteor/vulcan:core';

const specificResolvers = {
  Feed: {
     async user(feed, args, context) {
      if (!feed.userId) return null;
      return context.Users.findOne({ _id: feed.userId }, { fields: context.Users.getViewableFields(context.currentUser, context.Users) });
    },
  }
};

GraphQLSchema.addResolvers(specificResolvers);
// basic list, single, and total query resolvers
const resolvers = {

  list: {

    name: 'feedsList',

    resolver(root, {terms = {}}, context, info) {
      let {selector, options} = context.Feeds.getParameters(terms, {}, context.currentUser);
      return context.Feeds.find(selector, options).fetch();
    },

  },

  single: {

    name: 'feedsSingle',

    resolver(root, {documentId}, context) {
      const document = context.Feeds.findOne({_id: documentId});
      return context.Users.restrictViewableFields(context.currentUser, context.Feeds, document);
    },

  },

  total: {

    name: 'feedsTotal',

    resolver(root, {terms = {}}, context) {
      const {selector, options} = context.Feeds.getParameters(terms, {}, context.currentUser);
      return context.Feeds.find(selector, options).count();
    },

  }
};

export default resolvers;
