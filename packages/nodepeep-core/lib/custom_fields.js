import Posts from "meteor/vulcan:posts";
import Users from "meteor/vulcan:users";
import { getCategoriesAsOptions } from 'meteor/vulcan:categories';
import Tags from 'meteor/vulcan:forms-tags';
import { getComponent, getSetting } from 'meteor/vulcan:lib';
;
/*
Modified 07FEB2017

Let's assign a color to each post (why? cause we want to, that's why).
We'll do that by adding a custom field to the Posts collection.
Note that this requires our custom package to depend on vulcan:posts and vulcan:users.
*/
const formGroups = {
  admin: {
    name: "admin",
    order: 2
  }
};

const originalAvatarConstructor = Users.avatar;

// extends the Users.avatar function
Users.avatar = {
  ...originalAvatarConstructor,
  getUrl(user) {
    url = originalAvatarConstructor.getUrl(user);

    return !!user && user.avatar ? user.avatar : url;
  },
};

Posts.addField([
  {
    fieldName: 'color',
    fieldSchema: {
      type: String,
      control: "select", // use a select form control
      optional: true, // this field is not required
      insertableBy: ['admins'],
      editableBy: ['admins'],
      viewableBy: ['guests'],
      form: {
        options: function () { // options for the select form control
          return [
            {value: "white", label: "White"},
            {value: "yellow", label: "Yellow"},
            {value: "blue", label: "Blue"},
            {value: "red", label: "Red"},
            {value: "green", label: "Green"}
          ];
        } //options
      },//form
    }//fieldSchema
  },
  {
    fieldName: 'sponsored',
    fieldSchema: {
      type: Boolean,
      control: 'checkbox',
      label: 'Sponsored Post',
      optional: true,
      defaultValue: false,
      insertableBy: ['admins'],
      editableBy: ['admins'],
      viewableBy: ['guests'],
      group: formGroups.admin
    }
  },
]);

/*******************************************************************/

// extends Users schema with a new field: 'avatar' 👁
Users.addField([
  {
  fieldName: 'avatar',
  fieldSchema: {
    type: String,
    optional: true,
    control: getComponent('Upload'),
    insertableBy: ['members'],
    editableBy: ['members'],
    viewableBy: ['guests'],
    form: {
      options: {
        preset: getSetting('cloudinaryPresets').avatar // this setting refers to the transformation you want to apply to the image
      },
    }
   }
 },
  {
    fieldName: 'ppdLimit',
    fieldSchema: {
      type: Number,
      label: 'Daily Post Limit',
      optional: false,
      defaultValue: 0,
    }
  },
  {
    fieldName: 'warnings',
    fieldSchema: {
      type: Number,
      label: 'Warnings',
      optional: false,
      defaultValue: 0,
    }
  },
  {
    fieldName: 'catmod',
    fieldSchema: {
      type: Array,
      label: "Category",
      control: Tags,
      optional: true,
      viewableBy: ['supermods','mods'],
      editableBy: ['admins','supermods'],
      insertableBy: ['admins','supermods'],
      form: {
        options: formProps => getCategoriesAsOptions(formProps.client)
      },
    //  group: ['mods','supermods'],
    }
  },
  {
    fieldName: 'catmod.$',
    fieldSchema: {
      type: String,
      optional: true
    }
  },
   {
    fieldName: 'rating',
    fieldSchema: {
      type: Number,
      optional: true, // this field is required
      defaultValue: 1,
    }
  },
  {
    fieldName: 'rank',
    fieldSchema: {
      type: String,
      label: 'Users Rank',
      optional: false, // this field is required
      defaultValue: 'none',
    }
  },
  {
    fieldName: 'awards',
    fieldSchema: {
      type: Object,
      label: 'User Awards',
      optional: true, // this field is required
      defaultValue: null, //set default rating to 0
    }
  },
//----------Work Specific Schema----------//
  {
    fieldName: 'job',
    fieldSchema: {
      type: String,
      label: 'User Job',
      optional: true, // this field is required
      defaultValue: 'none',
    }
  },
  {
    fieldName: 'education',
    fieldSchema: {
      type: Object,
      label: 'User Education',
      optional: true, // this field is required
      defaultValue: null,
    }
  },
  {
    fieldName: 'prospectiveJob',
    fieldSchema: {
      type: String,
      label: 'Prospective Job',
      optional: false, // this field is required
      defaultValue: 'none',
    }
  },
  {
    fieldName: 'jobLocation',
    fieldSchema: {
      type: String,
      label: 'Job Location',
      optional: false, // this field is required
      defaultValue: 'none',
    }
  },
  {
    fieldName: 'certifications',
    fieldSchema: {
      type: Object,
      label: 'Certifications',
      optional: true, // this field is required
      defaultValue: null,
    }
  },
//----------Game Specific----------//
  {
    fieldName: 'xboxGamerTag',
    fieldSchema: {
      type: String,
      label: 'Xbox Gamer Tag',
      optional: true, // this field is required
      defaultValue: 'none',
    }
  },
  {
    fieldName: 'psGamerTag',
    fieldSchema: {
      type: String,
      label: 'Playstation Gamer Tag',
      optional: true, // this field is required
      defaultValue: 'none',
    }
  },
  {
    fieldName: 'originGamerTag',
    fieldSchema: {
      type: String,
      label: 'Origin Gamer Tag',
      optional: true, // this field is required
      defaultValue: 'none',
    }
  },
  {
    fieldName: 'uPlayGamerTag',
    fieldSchema: {
      type: String,
      label: 'uPlay Gamer Tag',
      optional: true, // this field is required
      defaultValue: 'none',
    }
  },
  {
    fieldName: 'bNetGamerTag',
    fieldSchema: {
      type: String,
      label: 'Battle.Net Gamer Tag',
      optional: true, // this field is required
      defaultValue: 'none',
    }
  }
]);
