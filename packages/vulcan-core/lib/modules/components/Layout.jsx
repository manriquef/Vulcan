import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Layout = ({children}) =>
  <div className="wrapper" id="wrapper">{children}</div>

Layout.displayName = "Layout";

registerComponent('Layout', Layout);

export default Layout;