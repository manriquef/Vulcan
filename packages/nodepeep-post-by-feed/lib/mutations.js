import { newMutation, editMutation, removeMutation, GraphQLSchema, Utils } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';

const performCheck = (mutation, user, document) => {
  if (!mutation.check(user, document)) throw new Error(Utils.encodeIntlError({id: `app.mutation_not_allowed`, value: `"${mutation.name}" on _id "${document._id}"`}));
};

const mutations = {

  new: {

    name: 'feedsNew',

    check(user, document) {
      if (!user) return false;
      return Users.canDo(user, 'feeds.new');
    },

    mutation(root, {document}, context) {

      performCheck(this, context.currentUser, document);

      return newMutation({
        collection: context.Feeds,
        document: document,
        currentUser: context.currentUser,
        validate: true,
        context,
      });
    },

  },

  edit: {

    name: 'feedsEdit',

    check(user, document) {
      if (!user || !document) return false;
       return Users.owns(user, document) ? Users.canDo(user, 'feeds.edit') : Users.canDo(user, `feeds.edit.all`);
    }, // end of check

    mutation(root, {documentId, set, unset}, context) {

      const document = context.Feeds.findOne(documentId);
      performCheck(this, context.currentUser, document);

      return editMutation({
        collection: context.Feeds,
        documentId: documentId,
        set: set,
        unset: unset,
        currentUser: context.currentUser,
        validate: true,
        context,
      });
    },

  },

  remove: {

    name: 'feedsRemove',

    check(user, document) {
      if (!user || !document) return false;
      return Users.owns(user, document) ? Users.canDo(user, 'feeds.remove') : Users.canDo(user, `feeds.remove.all`);
    },

    mutation(root, {documentId}, context) {

      const document = context.Feeds.findOne(documentId);
      performCheck(this, context.currentUser, document);

      return removeMutation({
        collection: context.Feeds,
        documentId: documentId,
        currentUser: context.currentUser,
        validate: true,
        context,
      });
    },

  },

};

GraphQLSchema.addMutation('increasePostViewCount(postId: String): Float');

export default mutations;
