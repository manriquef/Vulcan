/*
  Modified: 23DEC2016
  Removed <Components.Newsletter /> from below <Components.FlashMessages />
  <Components.CardsItem post={this.props.children} currentUser={this.props.currentUser} />
*/
import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';

class Layout extends Component {

  render() {
    return (
      <div className="wrapper" id="wrapper">

        <Components.HeadTags />

        <Components.UsersProfileCheck {...this.props} />

        <Components.Header {...this.props}/>

        <div className="main">

          <Components.FlashMessages />

          {this.props.children}

        </div>

        <Components.Footer {...this.props}/>

      </div>
    )
  }
}

Layout.displayName = "Layout";

registerComponent('Layout', Layout);
