import { getFirstAdminUser, fetchFeeds } from './fetch_feeds.js';
import { createDummyUsers } from './seed.js';
import Categories from 'meteor/vulcan:categories';
import Users from 'meteor/vulcan:users';
import Feeds from '../collection.js';
import { newMutation } from 'meteor/vulcan:core';


const addJob = () => {
  SyncedCron.add({
    name: 'Post by RSS feed',
    schedule: function(parser) {
      return parser.text('every 1 minutes');
    },
    job: () => {
      if (Feeds.find().count()) {
        fetchFeeds();
      }
    }
  });
};

// Load feeds from settings, if there are any
Meteor.startup(() => {

// Insert dummy users first
  if (!Users.find().count()) {
    createDummyUsers();
  }
  addJob();

  if (Meteor.settings && Meteor.settings.feeds) {
    Meteor.settings.feeds.forEach(feed => {
      // look for existing feed with same url
      let existingFeed = Feeds.findOne({url: feed.url});

      // todo: accept more than one category
      if (feed.categories) {
        const category = Categories.findOne({ slug: feed.categories });
        try {
          feed.categories = [category]; // this will break the post feeds if changed to ._id
        } catch (e) {
          console.log(e);
        }
      }

      if (feed.userId) {
                                // What you want - What you have
        const user = Users.findOne({ username: feed.userId });
        try {
          feed.userId = user._id;//if it doesn't exist it fails
        } catch (e) {
          console.log(e);
        }
      }

      /*
      if (feed.categorySlug && feed.categorySlug.length > 0) {
        feed.categorySlug.forEach(function(slug) {
          // if the RSS category corresponds to a category, add it
          const category = Categories.findOne({ slug: slug });
          try {
            feed.categories = [category._id];//if it doesn't exist it fails
          } catch (e) {
            console.log(e);
          }
        });
      }
      */

      if (existingFeed) {
        // if feed exists, update it with settings data except url
        delete feed.url;
        Feeds.update(existingFeed._id, { $set: feed });
      } else {
        // if not, create it only if there is an admin user
        if (feed.userId) {
          const AdminUser = feed.userId;
          console.log(`// Creating feed “${feed.url}”`);
        } else {
          const AdminUser = getFirstAdminUser();
          console.log(`// Creating feed “${feed.url}”`);
        }

          if (typeof AdminUser == 'undefined') {
            console.log('// No userId defined and no admin found, cannot create feed');
          }

        feed.createdFromSettings = true;

        try{
        newMutation({
          collection: Feeds,
          document: feed,
          currentUser: feed.userId,
          validate: false,
        });
      } catch(error) {
        console.log(error);
      }

      }
    });
  }
});
