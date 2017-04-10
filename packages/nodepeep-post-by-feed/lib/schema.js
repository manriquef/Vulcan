import SimpleSchema from 'simpl-schema';
import Users from 'meteor/vulcan:users';
import { getCategoriesAsOptions } from 'meteor/vulcan:categories';
import Tags from 'meteor/vulcan:forms-tags';

/**
 * @summary Users schema
 * @type {Object}
 */


 export function getAdminAsOptions (apolloClient) {
   // give the form component (here: checkboxgroup) exploitable data
   return Users.find({ $or: [{ isAdmin: true }, { isOwner: true }] }).map((user) => {
     return {
       value: user._id,
       label: Users.getDisplayName(user)
     };
   });
 }

const schema = {
   url: {
     type: String,
     regEx: SimpleSchema.RegEx.Url,
     viewableBy: ['guests'],
     insertableBy: ['admins'],
     editableBy: ['admins'],
   },
   title: {
     type: String,
     optional: true,
     viewableBy: ['guests'],
     insertableBy: ['admins'],
     editableBy: ['admins'],
   },
   userId: {
     type: String,
     control: 'select',
     viewableBy: ['guests'],
     insertableBy: ['admins'],
     editableBy: ['admins'],
     form: {
       options: formProps => getAdminAsOptions(formProps.client)
     },
    resolveAs: 'user: User',
   },
   categories: {
     type: Array,
     control: Tags,
     optional: true,
     viewableBy: ['guests'],
     insertableBy: ['admins'],
     editableBy: ['admins'],
     form: {
       noselect: true,
       order: 50,
       options: formProps => getCategoriesAsOptions(formProps.client)
     },
     resolveAs: 'categories: [Category]',//categoriesArray
   },
   createdFromSettings: {
     type: Boolean,
     optional: true,
   },
   subjectToParsingErrors: {
     type: Boolean,
     optional: true,
   }
};

export default schema;
