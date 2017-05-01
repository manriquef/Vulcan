import { GraphQLSchema } from 'meteor/vulcan:core';

const reportResolvers = {
  Post: {
    reporters(post, args, context) {
      return post.reporters ? context.Users.find({_id: {$in: post.reporters}}, { fields: context.getViewableFields(context.currentUser, context.Users) }).fetch() : [];
    },
  },
  Comment: {
    reporters(comment, args, context) {
      return comment.reporters ? context.Users.find({_id: {$in: comment.reporters}}, { fields: context.getViewableFields(context.currentUser, context.Users) }).fetch() : [];
    },
  },
};

GraphQLSchema.addResolvers(reportResolvers);
