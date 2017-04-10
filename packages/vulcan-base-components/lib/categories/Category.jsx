import { ModalTrigger, Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, MenuItem } from 'react-bootstrap';
import { withRouter } from 'react-router'
import Categories from 'meteor/vulcan:categories';

class Category extends Component {

  renderEdit() {
    return (
      <ModalTrigger title="Edit Category" component={<a className="edit-category-link"><Components.Icon name="edit"/></a>}>
        <Components.CategoriesEditForm category={this.props.category}/>
      </ModalTrigger>
    )
  }

  render() {

    const {category, index, router} = this.props;

    // const currentQuery = router.location.query;
    <Components.ShowIf check={Categories.options.mutations.edit.check} document={category}>{this.renderEdit()}</Components.ShowIf>
    const currentCategorySlug = router.location.query.cat;
    const newQuery = _.clone(router.location.query);
    newQuery.cat = category.slug;

    return (
      <div className="category-button-item">
        <LinkContainer to={{pathname:"/", query: newQuery}}>
          <Button
            bsStyle="primary"
            bsSize="small"
            key={category._id}
          >
            {currentCategorySlug === category.slug ? <Components.Icon name="voted"/> :  null}
            {category.name}
          </Button>
        </LinkContainer>
      </div>
    )
  }
}

Category.propTypes = {
  category: PropTypes.object,
  index: PropTypes.number,
  currentCategorySlug: PropTypes.string,
  openModal: PropTypes.func
};

registerComponent('Category', Category, withRouter);
