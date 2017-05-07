import { ModalTrigger, Components, registerComponent, withList, Utils } from "meteor/vulcan:core";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { ButtonToolbar, Button, MenuItem } from 'react-bootstrap';
import { withRouter } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap';
import Categories from 'meteor/vulcan:categories';
import { withApollo } from 'react-apollo';

class CategoryInfo extends Component {

  getCurrentCategory() {
    const categories = this.props.results;


    // check if a category is currently active in the route
    const currentCategorySlug = this.props.router.location.query && this.props.router.location.query.cat;
    const currentCategory = Categories.findOneInStore(this.props.client.store, {slug: currentCategorySlug});
    const parentCategories = Categories.getParents(currentCategory, this.props.client.store);

    return currentCategorySlug;
  }

  getCurrentCategoryRules() {

    const defaultCategory = "Main";
    if(this.props.router.location.query.cat) {
      const currentCategory = Categories.findOneInStore(this.props.client.store, {slug: this.props.router.location.query.cat});
      const currentCategoryRules = currentCategory.rules;
      return currentCategoryRules;
    }
    else {
      return defaultCategory;
    }
  }

  render() {

    return (
      <div>
          <div className="categories-rules">
            This feed is
            {!!this.getCurrentCategory() ? this.getCurrentCategoryRules() : "nothing here..."}
          </div>

      </div>
    )

  }
}

CategoryInfo.propTypes = {
  results: PropTypes.array,
};


const options = {
  collection: Categories,
  queryName: 'categoriesListQuery',
  fragmentName: 'CategoriesList',
};

registerComponent('CategoryInfo', CategoryInfo, withRouter, withApollo, [withList, options]);
