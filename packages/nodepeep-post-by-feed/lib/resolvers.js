/*

Three resolvers are defined:

- list (e.g.: moviesList(terms: JSON, offset: Int, limit: Int) )
- single (e.g.: moviesSingle(_id: String) )
- listTotal (e.g.: moviesTotal )

*/

import { addGraphQLResolvers } from 'meteor/vulcan:core';

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
      return context.Users.keepViewableFields(context.currentUser, context.Feeds, document);
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

// add the "user" resolver for the Movie type separately
const feedUserResolver = {
  Feed: {
    user(feed, args, context) {
      return context.Users.findOne({ _id: feed.userId }, { fields: context.Users.getViewableFields(context.currentUser, context.Users) });
    },
  },
};
addGraphQLResolvers(feedUserResolver);

export default resolvers;
