import { getFirstAdminUser } from './fetch_feeds';
import Categories from 'meteor/vulcan:categories';
import Users from 'meteor/vulcan:users';
import Feeds from '../collection.js';
import { newMutation } from 'meteor/vulcan:core';

// Load feeds from settings, if there are any
//Meteor.startup(() => {

  if (Meteor.settings && Meteor.settings.feeds) {
    Meteor.settings.feeds.forEach(feed => {
      // look for existing feed with same url
      let existingFeed = Feeds.findOne({url: feed.url});

      // todo: accept more than one category
      if (feed.categorySlug) {
        const category = Categories.findOne({ slug: feed.categorySlug });
        try {
          feed.categories = [category]; // this will break the post feeds if changed to ._id
        } catch (e) {
          console.log(e);
        }
      }

      if (feed.userName) {
                                // What you want - What you have
        const user = Users.findOne({ username: feed.userName });
        try {
          feed.userId = [user._id];//if it doesn't exist it fails
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
        if (feed.userName) {
          const AdminUser = feed.userId;
        } else {
          const AdminUser = getFirstAdminUser();
        }

          if (typeof AdminUser == 'undefined') {
            console.log('// No userId defined and no admin found, cannot create feed');
          }

        feed.createdFromSettings = true;
        try{
        newMutation({
          action: 'feeds.new',
          collection: Feeds,
          document: feed,
          currentUser: feed.userId,
          validate: false,
        });
      } catch(error) {
        console.log(error);
      }

        console.log(`// Creating feed “${feed.url}”`);

      }
    });
  }
//});
