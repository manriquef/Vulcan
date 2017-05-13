import { Components, registerComponent, withCurrentUser, addAction, addReducer } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import tinycolor from 'tinycolor2';
import { Link } from 'react-router'
import { Dashboard, Header, Sidebar } from 'react-adminlte-dash';
import Users from 'meteor/vulcan:users';
/* eslint-disable no-alert */

const initialState = {
  theme: 'skin-black',
};

const themeReducer = (state, action) => {
  switch (action.theme) {
    case 'skin-black':
    case 'skin-black-light':
    case 'skin-blue':
    case 'skin-blue-light':
    case 'skin-green':
    case 'skin-green-light':
    case 'skin-purple':
    case 'skin-purple-light':
    case 'skin-red':
    case 'skin-red-light':
    case 'skin-yellow':
    case 'skin-yellow-light':
      return action.theme;
    default:
      return state;
  }
};

addAction({
  themeReducer: {
    themeAction: (theme) => ({
      type: 'CHANGE_THEME',
      theme,
    }),
  },
});

addReducer({
  themeReducer: (state = initialState, action) => {
    if (action.type === 'CHANGE_THEME') {
      return Object.assign({}, state, {
        theme: themeReducer(state.theme, action),
      });
    }
    return state;
  },
});

const mapStateToProps = state => ({ theme: state.app.theme });
const mapDispatchToProps = dispatch => bindActionCreators(getActions().themeAction(theme), dispatch);

/************************************************************/

const navMenu = (user) => ([
  <Header.Item
    href={`https://github.com/manriquef/vulcanjs`}
    iconClass="fa fa-github"
    key="1"
    title="Github"
  />,
  <Header.Item
    href={`https://github.com/manriquef/vulcanjs`}
    iconClass="fa fa-github"
    key="3"
    title="Github"
  />,
  <Header.Item
    href={`https://github.com/manriquef/vulcanjs`}
    iconClass="fa fa-github"
    key="4"
    title="Github"
  />,
  <Header.UserMenu
    name={user ? user.username: "Guest"}
    image={user ? user.avatar: Users.avatar}
    profileAction={() => <Components.UsersProfile/>}
    signOutAction={() => Meteor.logout(() => client.resetStore())}
    key="2"
  />,
]);

const sb = pickTheme => ([
  <Sidebar.UserPanel
    name="Guest"//{user ? user.username: "Guest"}
    image=""//{user ? user.avatar: Users.avatar}
    online
    key="1"
  />,
  <Sidebar.Menu header="MAIN NAVIGATION" key="3">
    <Sidebar.Menu.Item icon={{ className: 'fa-dashboard' }} title="Dashboard Colors" >
      <Sidebar.Menu.Item
        icon={{ color: tinycolor('black').toString() }}
        onClick={() => pickTheme('skin-black')}
        title="Black"
      />
      <Sidebar.Menu.Item
        icon={{ color: tinycolor('black').lighten(10).toString() }}
        onClick={() => pickTheme('skin-black-light')}
        title="Black Light"
      />
      <Sidebar.Menu.Item
        icon={{ color: '#3c8dbc' }}
        onClick={() => pickTheme('skin-blue')}
        title="Blue"
      />
      <Sidebar.Menu.Item
        icon={{ color: tinycolor('#3c8dbc').lighten(10).toString() }}
        onClick={() => pickTheme('skin-blue-light')}
        title="Blue Light"
      />
      <Sidebar.Menu.Item
        icon={{ color: '#00a65a' }}
        onClick={() => pickTheme('skin-green')}
        title="Green"
      />
      <Sidebar.Menu.Item
        icon={{ color: tinycolor('#00a65a').lighten(10).toString() }}
        onClick={() => pickTheme('skin-green-light')}
        title="Green Light"
      />
      <Sidebar.Menu.Item
        icon={{ color: '#605ca8' }}
        onClick={() => pickTheme('skin-purple')}
        title="Purple"
      />
      <Sidebar.Menu.Item
        icon={{ color: tinycolor('#605ca8').lighten(10).toString() }}
        onClick={() => pickTheme('skin-purple-light')}
        title="Purple Light"
      />
      <Sidebar.Menu.Item
        icon={{ color: '#dd4b39' }}
        onClick={() => pickTheme('skin-red')}
        title="Red"
      />
      <Sidebar.Menu.Item
        icon={{ color: tinycolor('#dd4b39').lighten(10).toString() }}
        onClick={() => pickTheme('skin-red-light')}
        title="Red Light"
      />
      <Sidebar.Menu.Item
        icon={{ color: '#f39c12' }}
        onClick={() => pickTheme('skin-yellow')}
        title="Yellow"
      />
      <Sidebar.Menu.Item
        icon={{ color: tinycolor('#f39c12').lighten(10).toString() }}
        onClick={() => pickTheme('skin-yellow-light')}
        title="Yellow Light"
      />
    </Sidebar.Menu.Item>
    <Sidebar.Menu.Item
      icon={{ className: 'fa-files-o' }}
      labels={[{ key: 1, type: 'primary', text: '4' }]}
      title="Layout Options"
    >
      <Sidebar.Menu.Item title="Top Navigation" />
      <Sidebar.Menu.Item title="Boxed" href="/boxed" />
      <Sidebar.Menu.Item title="Fixed" />
      <Sidebar.Menu.Item title="Collapsed Sidebar" />
    </Sidebar.Menu.Item>
    <Sidebar.Menu.Item
      icon={{ className: 'fa-th' }}
      labels={[{ key: 1, type: 'success', text: 'new' }]}
      title="Widgets"
    />
    <Sidebar.Menu.Item icon={{ className: 'fa-pie-chart' }} title="Charts" >
      <Sidebar.Menu.Item title="ChartJS" />
      <Sidebar.Menu.Item title="Morris" />
      <Sidebar.Menu.Item title="Flot" />
      <Sidebar.Menu.Item title="Inline Charts" />
    </Sidebar.Menu.Item>
    <Sidebar.Menu.Item icon={{ className: 'fa-laptop' }} title="UI Elements" >
      <Sidebar.Menu.Item title="General" />
      <Sidebar.Menu.Item title="Icons" />
      <Sidebar.Menu.Item title="Buttons" />
      <Sidebar.Menu.Item title="Sliders" />
      <Sidebar.Menu.Item title="Timeline" />
      <Sidebar.Menu.Item title="Modals" />
    </Sidebar.Menu.Item>
    <Sidebar.Menu.Item icon={{ className: 'fa-edit' }} title="Forms" >
      <Sidebar.Menu.Item title="General Elements" />
      <Sidebar.Menu.Item title="Advanced Elements" />
      <Sidebar.Menu.Item title="Editors" />
    </Sidebar.Menu.Item>
    <Sidebar.Menu.Item icon={{ className: 'fa-table' }} title="Tables" >
      <Sidebar.Menu.Item title="Simple tables" />
      <Sidebar.Menu.Item title="Data tables" />
    </Sidebar.Menu.Item>
    <Sidebar.Menu.Item
      icon={{ className: 'fa-calendar' }}
      labels={[
        { key: 1, type: 'primary', text: '17' },
        { key: 2, type: 'danger', text: '3' },
      ]}
      title="Calendar"
    />
    <Sidebar.Menu.Item
      icon={{ className: 'fa-envelope' }}
      labels={[
        { key: 2, type: 'success', text: '16' },
        { key: 1, type: 'warning', text: '12' },
        { key: 3, type: 'danger', text: '5' },
      ]}
      title="Mailbox"
    />
    <Sidebar.Menu.Item icon={{ className: 'fa-folder' }} title="Examples" >
      <Sidebar.Menu.Item title="Invoice" />
      <Sidebar.Menu.Item title="Profile" />
      <Sidebar.Menu.Item title="Blank Page" />
      <Sidebar.Menu.Item title="Pace Page" />
    </Sidebar.Menu.Item>
    <Sidebar.Menu.Item icon={{ className: 'fa-share' }} title="Multilevel">
      <Sidebar.Menu.Item title="Level One" />
      <Sidebar.Menu.Item title="Level One" >
        <Sidebar.Menu.Item title="Level Two" />
        <Sidebar.Menu.Item title="Level Two" >
          <Sidebar.Menu.Item title="Level Three" />
        </Sidebar.Menu.Item>
      </Sidebar.Menu.Item>
      <Sidebar.Menu.Item title="Level One" />
    </Sidebar.Menu.Item>
    <Sidebar.Menu.Item active icon={{ className: 'fa-book' }} title="Documentation" />
  </Sidebar.Menu>,
  <Sidebar.Menu header="LABELS" key="4">
    <Sidebar.Menu.Item icon={{ color: 'danger' }} title="Danger" />
    <Sidebar.Menu.Item icon={{ color: 'warning' }} title="Warning" />
    <Sidebar.Menu.Item icon={{ color: 'information' }} title="Information" />
  </Sidebar.Menu>,
]);

const footer = () => ([
  <strong>
    <span>Copyright © 2017 </span>
    <a href="http://www.nodepeep.com">FM</a>
    <span>. </span>
  </strong>,
  <span> All rights reserved.</span>,
  <div style={{ float: 'right' }}>
    <b>Version</b><span> 1.0.0</span>
  </div>,
]);

const Layout = ({currentUser, children, theme, pickTheme}) =>

  <div className="wrapper" id="wrapper">

    {currentUser ? <Components.UsersProfileCheck currentUser={currentUser} documentId={currentUser._id} /> : null}

        <Dashboard
          navbarChildren={navMenu(currentUser)}
          sidebarChildren={sb(pickTheme)}
          footerChildren={footer()}
          sidebarMini
          initialCollapse
          theme={theme}
        >

          <Components.HeadTags />
          <Components.Header />
            <div className="main">
              <Components.FlashMessages />
            </div>

         {children}

         </Dashboard>
  </div>

Layout.propTypes = {
    pickTheme: PropTypes.func,
    theme: PropTypes.string,
}

registerComponent('Layout', Layout, withCurrentUser, connect(mapStateToProps, mapDispatchToProps));
export default Layout;
