import schema from './schema.js';
import mutations from './mutations.js';
import resolvers from './resolvers.js';
import fragments from './fragments.js';
import { createCollection } from 'meteor/vulcan:core';


const Feeds = createCollection({

  collectionName: 'Feeds',

  typeName: 'Feed',

  schema,

  resolvers,

  mutations,

});

export default Feeds;
