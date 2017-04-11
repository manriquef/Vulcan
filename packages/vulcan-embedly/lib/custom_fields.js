import EmbedlyURL from './components/EmbedlyURL.jsx';
import ThumbnailURL from './components/ThumbnailURL.jsx';
import Posts from "meteor/vulcan:posts";

Posts.addField([
  {
    fieldName: 'url',
    fieldSchema: {
      control: EmbedlyURL, // we are just extending the field url, not replacing it
    }
  },
  {
    fieldName: 'thumbnailUrl',
    fieldSchema: {
      type: String,
      optional: true,
      defaultValue: "/packages/vulcan_getting-started/content/images/telescope.png",
      insertableBy: ['members'],
      editableBy: ['members'],
      viewableBy: ['guests'],
      control: ThumbnailURL,
    }
  },
  {
    fieldName: 'media',
    fieldSchema: {
      type: Object,
      optional: true,
      blackbox: true,
      viewableBy: ['guests'],
    }
  },
  {
    fieldName: 'sourceName',
    fieldSchema: {
      type: String,
      optional: true,
      viewableBy: ['guests'],
    }
  },
  {
    fieldName: 'sourceUrl',
    fieldSchema: {
      type: String,
      optional: true,
      viewableBy: ['guests'],
    }
  }
]);
