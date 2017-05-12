import Posts from 'meteor/vulcan:posts';
import Users from 'meteor/vulcan:users';
import Categories from 'meteor/vulcan:categories';
import { getCategoriesAsOptions } from 'meteor/vulcan:categories';
import Tags from 'meteor/vulcan:forms-tags';
import { getComponent, getSetting } from 'meteor/vulcan:lib';

/*
Modified 18APR2017

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

export function getUsersFromApollo (apolloClient) {

  // get the current data of the store
  const apolloData = apolloClient.store.getState().apollo.data;

  const allUsers = _.filter(apolloData, (object, key) => {
    return object.__typename === 'User'
  });

  // does not show dummy users
  const npUsers = _.filter(allUsers, function(item){
    return !item.isDummy;
 });

  return npUsers;
}

export function getUsers (apolloClient) {
   return getUsersFromApollo(apolloClient).map(function (users) {
        return {value: users._id, label: users.username}
    });
}

Categories.addField([
  {
    fieldName: 'rules',
    fieldSchema: {
      type: String,
      control: "textarea",
      max: 1000,
      optional: true,
      insertableBy: ['admins'],
      editableBy: ['admins','supermods'],
      viewableBy: ['guests'],
    }//fieldSchema
  },
  {
    fieldName: 'image',
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
    fieldName: 'mods',
    fieldSchema: {
      type: String,
      label: 'Moderators',
      control: Tags,
      max: 24,
      optional: true,
      insertableBy: ['admins'],
      editableBy: ['admins','supermods'],
      viewableBy: ['guests'],
      form: {
        options: formProps => getUsers(formProps.client)
      }
    }//fieldSchema
  },

]);

/*******************************************************************/
// Posts
/*******************************************************************/

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
      insertableBy: ['admins'],
      editableBy: ['admins'],
      viewableBy: ['guests'],
      group: formGroups.admin
    }
  },
]);

/*******************************************************************/
// Users
/*******************************************************************/

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
      optional: true,
    }
  },
  {
    fieldName: 'online',
    fieldSchema: {
      type: Boolean,
      label: 'Online Status',
      optional: true,
    }
  },
  {
    fieldName: 'warnings',
    fieldSchema: {
      type: Number,
      label: 'Warnings',
      optional: true,
    }
  },
  {
    fieldName: 'catmod',
    fieldSchema: {
      type: Array,
      label: "Category",
      optional: true,
      viewableBy: ['guests'],
      editableBy: ['admins','supermods'],
      insertableBy: ['admins','supermods'],
      form: {
        options: formProps => getCategoriesAsOptions(formProps.client)
      },
      group: ['admins','mods','supermods'],
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
      optional: true,
    }
  },
  {
   fieldName: 'bookmark',
   fieldSchema: {
     type: Array,
     optional: true,
     resolveAs: 'categories: [Category]',
   }
  },
  {
   fieldName: 'bookmark.$',
   fieldSchema: {
     type: String,
     optional: true
   }
  },
  {
    fieldName: 'rank',
    fieldSchema: {
      type: String,
      label: 'Users Rank',
      optional: true,
    }
  },
  {
    fieldName: 'awards',
    fieldSchema: {
      type: Object,
      label: 'User Awards',
      optional: true,
    }
  },
//----------Work Specific Schema----------//
  {
    fieldName: 'job',
    fieldSchema: {
      type: String,
      label: 'User Job',
      optional: true,
    }
  },
  {
    fieldName: 'education',
    fieldSchema: {
      type: Object,
      label: 'User Education',
      optional: true,
    }
  },
  {
    fieldName: 'prospectiveJob',
    fieldSchema: {
      type: String,
      label: 'Prospective Job',
      optional: true,
    }
  },
  {
    fieldName: 'jobLocation',
    fieldSchema: {
      type: String,
      label: 'Job Location',
      optional: true,
    }
  },
  {
    fieldName: 'certifications',
    fieldSchema: {
      type: Object,
      label: 'Certifications',
      optional: true,
    }
  },
//----------Game Specific----------//
  {
    fieldName: 'xboxGamerTag',
    fieldSchema: {
      type: String,
      label: 'Xbox Gamer Tag',
      optional: true,
    }
  },
  {
    fieldName: 'psGamerTag',
    fieldSchema: {
      type: String,
      label: 'Playstation Gamer Tag',
      optional: true,
    }
  },
  {
    fieldName: 'originGamerTag',
    fieldSchema: {
      type: String,
      label: 'Origin Gamer Tag',
      optional: true,
    }
  },
  {
    fieldName: 'uPlayGamerTag',
    fieldSchema: {
      type: String,
      label: 'uPlay Gamer Tag',
      optional: true,
    }
  },
  {
    fieldName: 'bNetGamerTag',
    fieldSchema: {
      type: String,
      label: 'Battle.Net Gamer Tag',
      optional: true,
    }
  }
]);
