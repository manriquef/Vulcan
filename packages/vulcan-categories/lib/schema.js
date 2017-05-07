import { getComponent, getSetting } from 'meteor/vulcan:lib';
import Categories from 'meteor/vulcan:categories';

export function getCategories (apolloClient) {

  // get the current data of the store
  const apolloData = apolloClient.store.getState().apollo.data;

  // filter these data based on their typename: we are interested in the categories data
  const categories = _.filter(apolloData, (object, key) => {
    return object.__typename === 'Category'
  });

  return categories;
}

export function getCategoriesAsOptions (apolloClient) {
  // give the form component (here: checkboxgroup) exploitable data
  return getCategories(apolloClient).map(function (category) {
    return {
      value: category._id,
      label: category.name,
      // slug: category.slug, // note: it may be used to look up from prefilled props
    };
  });
}

const originalImageConstructor = Categories.image;

// extends the Users.avatar function
Categories.image = {
  ...originalImageConstructor,
  getUrl(category) {
    url = originalImageConstructor.getUrl(category);

    return !!category && category.image ? category.image : url;
  },
};

// category schema
const schema = {
  _id: {
    type: String,
    viewableBy: ['guests'],
    optional: true,
  },
  name: {
    type: String,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
  },
  description: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
    control: "textarea",
    form: {
      rows: 3
    }
  },
  order: {
    type: Number,
    optional: true,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
  },
  slug: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
  },
  parentId: {
    type: String,
    optional: true,
    control: "select",
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
    resolveAs: 'parent: Category',
    form: {
      options: formProps => getCategoriesAsOptions(formProps.client)
    }
  }
};

export default schema;
