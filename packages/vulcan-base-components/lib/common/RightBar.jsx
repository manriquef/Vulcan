import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RightBar extends Component {

  render() {
    return (
      <div className="rightbar" id="rightbar">
        <Components.SearchForm/>
        <div className="rightbar-categories">
          <Components.CategoriesList />
        </div>
        <div className="rightbar-category-info">
          <Components.CategoryInfo />
        </div>
      </div>
    )
  }
}

RightBar.displayName = "RightBar";

registerComponent('RightBar', RightBar);
