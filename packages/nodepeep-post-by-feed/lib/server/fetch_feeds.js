import { toMarkdown } from 'to-markdown';
import he from 'he';
import FeedParser from 'feedparser';
import { Readable } from 'stream';
import iconv from 'iconv-lite';
import moment from 'moment';
import { getSetting, newMutation } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import Posts from 'meteor/vulcan:posts';
import Categories from 'meteor/vulcan:categories';
import Feeds from '../collection.js';

export const getFirstAdminUser = function() {
  return Users.adminUsers({ sort: { createdAt: 1 }, limit: 1 })[0];
};

const normalizeEncoding = function (contentBuffer) {
  // got from https://github.com/szwacz/sputnik/
  let encoding;
  let content = contentBuffer.toString();

  const xmlDeclaration = content.match(/^<\?xml .*\?>/);
  if (xmlDeclaration) {
    const encodingDeclaration = xmlDeclaration[0].match(/encoding=("|').*?("|')/);
    if (encodingDeclaration) {
      encoding = encodingDeclaration[0].substring(10, encodingDeclaration[0].length - 1);
    }
  }

  if (encoding && encoding.toLowerCase() !== 'utf-8') {
    try {
      content = iconv.decode(contentBuffer, encoding);
    } catch (err) {
      // detected encoding is not supported, leave it as it is
    }
  }

  return content;
};

const extractThumbnail = function (body) {

  var x,n, thumbnail, isJpeg;

  var x = body.search(/\b(https?:\/\/\S*?\.(?:png|jpe?g|gif))\b/);
  var n = body.search(/\b((?:png|jpe?g|gif))\b/);

  isJpeg = body.slice(n,n+4);
  isJpeg == "jpeg" ? thumbnail = body.slice(x,n+4) : thumbnail = body.slice(x,n+3);

  return thumbnail;

};

const feedHandler = {
  getStream(content) {
    let stream = new Readable();
    stream.push(content);
    stream.push(null);

    return stream;
  },

  getItemCategories(item, feedCategories) {

    let itemCategories = [];

    // loop over RSS categories for the current item if it has any
    if (item.categories && item.categories.length > 0) {
      item.categories.forEach(function(name) {

        // if the RSS category corresponds to a category, add it
        const category = Categories.findOne({ name: name }, { fields: {_id: 1 } });
        if (category) {
          itemCategories.push(category._id);
        }

      });
    }

    // add predefined feed categories if there are any and remove any duplicates
    if (!!feedCategories) {
      itemCategories = _.uniq(itemCategories.concat(feedCategories));
    }
    return itemCategories;
  },

  handle(contentBuffer, userName, feedCategories, feedId) {
    const self = this;
    const content = normalizeEncoding(contentBuffer);
    const stream = this.getStream(content);
    const feedParser = new FeedParser();
    let newItemsCount = 0;


    stream.pipe(feedParser);
    feedParser.on('meta', Meteor.bindEnvironment(function (meta) {
      console.log('*** Parsing RSS feed: '+ meta.title);

      const currentFeed = Feeds.findOne({ _id: feedId }, { fields: { _id: 1, title: 1 } });
      if (!currentFeed.title || currentFeed.title !== meta.title) {
        Feeds.update({ _id: feedId }, { $set: { title: meta.title } });
        console.log('// Feed title updated');

      }
    }));

    feedParser.on('error', Meteor.bindEnvironment(function (error) {
      console.log(error);
      console.log(`=== ERROR Parsing Feed \nFeed Id ${feedId} is causing an issue, you may want to remove it.`);
      stream.unpipe();
    }));

    feedParser.on('readable', Meteor.bindEnvironment(function () {
      let s = this, item;

      var postBody;

      while (item = s.read()) {

        // if item has no guid, use the URL to give it one
        if (!item.guid) {
          item.guid = item.link;
        }

        // check if post already exists
        if (!!Posts.findOne({ feedItemId: item.guid })) {
          //console.log('// Feed item already imported');
          continue;
        }

        newItemsCount++;

        let post = {
          title: he.decode(item.title),
          url: item.link,
          feedId: feedId,
          feedItemId: item.guid,
          isFeed: true,
          userId: userName._id,
          thumbnailUrl: extractThumbnail(item.description),
          categories: self.getItemCategories(item, feedCategories._id)
        };


        if (item.description) {
          post.body = toMarkdown(he.decode(item.description));
          // a post body cannot exceed 3000 characters
          if (post.body.length > 3000)
            post.body = post.body.substring(0, 2999);
        }

        // youtube fetch patch
        if(!post.body && item.link.indexOf('youtube') > 0) {
            post.body = toMarkdown(he.decode(item["media:group"]["media:description"]['#']));
        }

        // if RSS item link is a 301 or 302 redirect, follow the redirect
        const get = HTTP.get(item.link, {followRedirects: false});
        if (!!get.statusCode && (get.statusCode === 301 || get.statusCode === 302) &&
            !!get.headers && !!get.headers.location) {
              post.url = get.headers.location;
            }

        if (typeof getSetting('postByFeedDefaultStatus') === 'number') {
          post.status = getSetting('postByFeedDefaultStatus');
        }

        // if RSS item has a date, use it
        if (item.pubdate)
          post.postedAt = moment(item.pubdate).toDate();

          try {
            newMutation({
              collection: Posts,
              document: post,
              currentUser: userName._id,
              validate: false,
            });
          } catch (error) {
            // catch errors so they don't stop the loop
          //  console.log(error);
          console.log(error + post);
          }

      }

      // console.log('// Found ' + newItemsCount + ' new feed items');
    }, function (error) {
      console.log('// Failed to bind environment');
      console.log(error.stack);
      stream.unpipe();
    }, feedParser));
  }
};

export const fetchFeeds = function() {
  let contentBuffer;

  Feeds.find().forEach(function(feed) {

    // if feed doesn't specify a user, default to admin
    const feedName = !!feed.userName ? feed.userName.trim() : null;
    const userName = Users.findOne({username: feedName});
    const feedCategories = Categories.findOne({ slug: feed.categorySlug });
    const feedId = feed._id;

    try {
      contentBuffer = HTTP.get(feed.url, { responseType: 'buffer' }).content;
      feedHandler.handle(contentBuffer, userName, feedCategories, feedId);
    } catch (error) {
      console.log(error);
      return true; // just go to next feed URL
    }
  });
};

Meteor.methods({
  // this method cannot be defined in /lib/methods.js as it uses the exported function 'fetchFeeds' which is available only server-side
  'feeds.fetch'() {
    console.log("// fetching feeds…");
    fetchFeeds();
  },
});
