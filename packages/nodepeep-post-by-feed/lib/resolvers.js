import { GraphQLSchema} from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';

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
