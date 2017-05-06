import SimpleSchema from 'simpl-schema';
import Users from 'meteor/vulcan:users';
import Tags from 'meteor/vulcan:forms-tags';
import Category, { getCategoriesAsOptions } from 'meteor/vulcan:categories';

/**
 * @summary Users schema
 * @type {Object}
 */

 export function getFeedUsersFromApollo (apolloClient) {

   // get the current data of the store
   const apolloData = apolloClient.store.getState().apollo.data;

   const allUsers = _.filter(apolloData, (object, key) => {
     return object.__typename === 'User'
   });

   const feedUsers = _.filter(allUsers, function(item){
     return item.isDummy === true;
  });

   return feedUsers;
 }

 export function getFeedUsers (apolloClient) {
    return getFeedUsersFromApollo(apolloClient).map(function (users) {
         return {value: users._id, label: users.username}
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
       options: formProps => getFeedUsers(formProps.client)
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
