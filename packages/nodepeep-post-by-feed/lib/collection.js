import schema from './schema.js';
import mutations from './mutations.js';
import { createCollection } from 'meteor/vulcan:core';


const Feeds = createCollection({

  collectionName: 'feeds',

  typeName: 'Feed',

  schema,

  mutations,

});

export default Feeds;
