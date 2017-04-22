import { Components, registerComponent, withDocument } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Categories from 'meteor/vulcan:categories';
import { withRouter } from 'react-router';

class CategoryInfo extends Component {

  render() {

    const {category, index, router} = this.props;

    const currentCategorySlug = this.props.router.location.query && this.props.router.location.query.cat;
    const currentCategory = Categories.findOneInStore(this.props.client.store, {slug: currentCategorySlug});
    const parentCategories = Categories.getParents(currentCategory, this.props.client.store);

    //const category = this.props.category;
    console.log("CatList: " + category);
    return (
    <div>{}</div>
    )
  }

}

CategoryInfo.propTypes = {
  category: PropTypes.array, // the current category
  document: PropTypes.object,
};

const options = {
  collection: Categories,
  fragmentName: 'CategoriesList',
};

registerComponent('CategoryInfo', CategoryInfo, withRouter, [withDocument, options]);
