import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';

class RightBar extends Component {

  render() {
    return (
      <div className="rightbar" id="rightbar">
        <Components.SearchForm/>
        <div className="rightbar-categories">
          <Components.CategoriesList />
        </div>
      </div>
    )
  }
}

RightBar.displayName = "RightBar";

registerComponent('RightBar', RightBar);
