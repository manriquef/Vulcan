import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CategoryInfo extends Component {

  renderCategory(category) {
    return (
      <div></div>
    )
  }

  render() {

    //const category = this.props.category;

    return (
    <div></div>
    )
  }

}

CategoryInfo.propTypes = {
  category: PropTypes.object.isRequired, // the current category
};

registerComponent('CategoryInfo', CategoryInfo);
