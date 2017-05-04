import SimpleSchema from 'simpl-schema';
import Users from 'meteor/vulcan:users';
import Tags from 'meteor/vulcan:forms-tags';
import Category, { getCategoriesAsOptions } from 'meteor/vulcan:categories';

/**
 * @summary Users schema
 * @type {Object}
 */

 export function getAdminAsOptions () {
   return Users.find({ isDummy: true }).map((users) => {
     return {
       value: users._id,
       label: users.username
     };
   });
 }

const schema = {
   _id: {
     type: String,
     optional: true,
     viewableBy: ['guests'],
   },
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
     resolveAs: 'user: User',
     form: {
       options: formProps => getAdminAsOptions()
     }
   },
   categories: {
     type: Array,
     control: Tags,
     optional: true,
     viewableBy: ['guests'],
     insertableBy: ['admins'],
     editableBy: ['admins'],
     resolveAs: 'categories: [Category]',
     form: {
       options: formProps => getCategoriesAsOptions(formProps.client)
     },
   },
   createdFromSettings: {
     type: Boolean,
     optional: true,
     viewableBy: ['guests'],
   },
   subjectToParsingErrors: {
     type: Boolean,
     optional: true,
   }
};

export default schema;
