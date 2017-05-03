import SimpleSchema from 'simpl-schema';
import Users from 'meteor/vulcan:users';
import Tags from 'meteor/vulcan:forms-tags';
import Category, { getCategoriesAsOptions } from 'meteor/vulcan:categories';

/**
 * @summary Users schema
 * @type {Object}
 */

 export function getFeedUsers (apolloClient) {

   // get the current data of the store
   const apolloData = apolloClient.store.getState().apollo.data;

   // filter these data based on their typename: we are interested in the categories data
   const testo = _.filter(apolloData, (object, key) => {
     return object.__typename === 'User'
   });

   return testo;
 }

 export function getFeedUsersAsOptions (apolloClient) {
   // give the form component (here: checkboxgroup) exploitable data
   return getFeedUsers(apolloClient).map(function (users) {
     return {
       value: users._id,
       label: users.username,
     };
   });
 }

 export function getAdminAsOptions (apolloClient) {
   // give the form component (here: checkboxgroup) exploitable data
   console.log("NIG" + JSON.stringify(Users.find({})));
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
       options: formProps => getFeedUsersAsOptions(formProps.client)
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
   },
   subjectToParsingErrors: {
     type: Boolean,
     optional: true,
   }
};

export default schema;
