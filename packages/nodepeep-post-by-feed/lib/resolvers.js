import { GraphQLSchema, Utils } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';


const resolvers = {

  list: {

    name: 'feedsList',

    check(user, terms, Feeds) {
      const {selector} = Feeds.getParameters(terms);
      if (selector.status) {
        const statuses = selector.status['$in'] ? selector.status['$in'] : [selector.status];
        const statusesLabel = statuses.map(status => _.findWhere(Feeds.statuses, {value: status}).label)
        return _.every(statusesLabel, label => Users.canDo(user, `feeds.view.${label}.all`));
      } else {
        return Users.canDo(user, `feeds.view`);
      }
    },

    resolver(root, {terms}, {currentUser, Users, Feeds}, info) {

      // check that the current user can access the current query terms
      Utils.performCheck(this, currentUser, terms, Feeds);

      // get selector and options from terms and perform Mongo query
      let {selector, options} = Feeds.getParameters(terms);
      options.limit = (terms.limit < 1 || terms.limit > 100) ? 100 : terms.limit;
      options.skip = terms.offset;
      const posts = Feeds.find(selector, options).fetch();

      // restrict documents fields
      const restrictedFeeds = Users.restrictViewableFields(currentUser, Feeds, posts);

      // prime the cache
      restrictedFeeds.forEach(post => Feeds.loader.prime(post._id, post));

      return restrictedFeeds;
    },

  },

  single: {

    name: 'feedsSingle',

    check(user, document, collection) {
      const status = _.findWhere(collection.statuses, {value: document.status});
      return Users.owns(user, document) ? Users.canDo(user, `feeds.view.${status.label}.own`) : Users.canDo(user, `feeds.view.${status.label}.all`);
    },

    async resolver(root, {documentId, slug}, {currentUser, Users, Feeds}) {

      // don't use Dataloader if post is selected by slug
      const post = documentId ? await Feeds.loader.load(documentId) : Feeds.findOne({slug});

      Utils.performCheck(this, currentUser, post, Feeds, documentId);

      return Users.restrictViewableFields(currentUser, Feeds, post);
    },

  },

  total: {

    name: 'feedsTotal',

    resolver(root, {terms}, {Feeds}) {
      const {selector} = Feeds.getParameters(terms);
      return Feeds.find(selector).count();
    },

  }
};

export default resolvers;
