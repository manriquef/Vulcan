import { ModalTrigger, Components, registerComponent, withList, Utils } from "meteor/vulcan:core";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { ButtonToolbar, Button, MenuItem } from 'react-bootstrap';
import { withRouter } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap';
import Categories from 'meteor/vulcan:categories';
import { withApollo } from 'react-apollo';

class CategoriesList extends Component {

  getNestedCategories() {
    const categories = this.props.results;

    // check if a category is currently active in the route
    const currentCategorySlug = this.props.router.location.query && this.props.router.location.query.cat;
    const currentCategory = Categories.findOneInStore(this.props.client.store, {slug: currentCategorySlug});
    const parentCategories = Categories.getParents(currentCategory, this.props.client.store);

    // decorate categories with active and expanded properties
    const categoriesClone = _.map(categories, category => {
      return {
        ...category, // we don't want to modify the objects we got from props
        active: currentCategory && category.slug === currentCategory.slug,
        expanded: parentCategories && _.contains(_.pluck(parentCategories, 'slug'), category.slug)
      };
    });

    const nestedCategories = Utils.unflatten(categoriesClone, '_id', 'parentId');

    return nestedCategories;
  }

  render() {

    const allCategoriesQuery = _.clone(this.props.router.location.query);
    delete allCategoriesQuery.cat;
    const nestedCategories = this.getNestedCategories();

    return (
      <div>
        <Components.ShowIf check={Categories.options.mutations.new.check}>
          <div className="categories-new-button">
            <ModalTrigger title={<FormattedMessage id="categories.new"/>} component={<Button bsStyle="primary" bsSize="small"><FormattedMessage id="categories.new"/></Button>}>
              <Components.CategoriesNewForm/>
            </ModalTrigger>
          </div>
        </Components.ShowIf>
          <div className="categories-item">
            <LinkContainer className="categories-all-button" to={{pathname:"/", query: allCategoriesQuery}}>
            <Button bsStyle="primary" bsSize="small">
                <FormattedMessage id="categories.all"/>
            </Button>
            </LinkContainer>
          </div>
          {
            // categories data are loaded
            !this.props.loading ?
              // there are currently categories
              nestedCategories && nestedCategories.length > 0 ?
                nestedCategories.map((category, index) => <Components.CategoriesNode key={index} category={category} index={index} openModal={this.openCategoryEditModal}/>)
              // not any category found
              : null
            // categories are loading
            : <Components.Loading />
          }
      </div>
    )

  }
}

CategoriesList.propTypes = {
  results: PropTypes.array,
};


const options = {
  collection: Categories,
  queryName: 'categoriesListQuery',
  fragmentName: 'CategoriesList',
  limit: 0,
  pollInterval: 0,
};

registerComponent('CategoriesList', CategoriesList, withRouter, withApollo, [withList, options]);
