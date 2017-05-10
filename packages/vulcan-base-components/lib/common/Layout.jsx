import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dashboard, Header, Sidebar } from 'react-adminlte-dash';

const nav = () => ([
  <Header.Item href="/some/link" key="1" />
]);

const sb = () => ([
  <Sidebar.Menu header="NAVIGATION" key="1">
    <Sidebar.Menu.Item title="Home" href="/" />
  </Sidebar.Menu>
]);

const App = ({ children }) => (
  <Dashboard
    navbarChildren={nav()}
    sidebarChildren={sb()}
    theme="skin-blue"
  >
    {children}
  </Dashboard>
);

/*
const Layout = ({currentUser, children}) =>
  <div className="wrapper" id="wrapper">

    <Components.HeadTags />

    {currentUser ? <Components.UsersProfileCheck currentUser={currentUser} documentId={currentUser._id} /> : null}

    <Components.Header />

    <div className="main">

      <Components.FlashMessages />

      {children}

    </div>

    <Components.Footer />

  </div>

registerComponent('Layout', Layout, withCurrentUser);*/
