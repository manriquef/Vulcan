import { GraphQLSchema, Utils } from 'meteor/vulcan:core';
import { mutateItem } from './report.js';

const reportSchema = `
  type Report {
    itemId: String
    power: Float
    reportedAt: String
  }

  union Reportable = Post | Comment
`;

GraphQLSchema.addSchema(reportSchema);

const resolverMap = {
  Reportable: {
    __resolveType(obj, context, info){
      if(obj.title){
        return 'Post';
      }

      if(obj.postId){
        return 'Comment';
      }

      return null;
    },
  },
};

GraphQLSchema.addResolvers(resolverMap);

GraphQLSchema.addMutation('report(documentId: String, reportType: String, collectionName: String) : Reportable');

const reportResolver = {
  Mutation: {
    report(root, {documentId, reportType, collectionName}, context) {
      const collection = context[Utils.capitalize(collectionName)];
      const document = collection.findOne(documentId);
      return context.Users.canDo(context.currentUser, `${collectionName.toLowerCase()}.${reportType}`) ? mutateItem(collection, document, context.currentUser, reportType, false) : false;
    },
  },
};

GraphQLSchema.addResolvers(reportResolver);
