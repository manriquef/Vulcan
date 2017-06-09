import { Components, registerComponent, withCurrentUser, addAction, getActions, addReducer, ModalTrigger  } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import tinycolor from 'tinycolor2';
import { Link, withRouter } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Dashboard, Header, Sidebar } from 'meteor/nodepeep:dash';
import Users from 'meteor/vulcan:users';
import { FormattedMessage, intlShape } from 'meteor/vulcan:i18n';

/* eslint-disable no-alert */

/*
 * Redux area
 *
 *
*/

const initialState = {
  theme: 'skin-black',
};

const themeAction = theme => ({
  type: 'CHANGE_THEME',
  theme,
});

const themeReducer = (state, action) => {
  switch (action.theme) {
    case 'skin-black':
    case 'skin-black-light':
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
const mapStateToProps = state => ({ theme: state.theme });
const mapDispatchToProps = dispatch => ({pickTheme: theme => dispatch(themeAction(theme))});

/*
 * Main UI
 *
 *
*/
const gotoUrl = (user) => {
  return (
  <div>
    <Link to={`/p/${user.slug}`}/>
  </div>
  )

}

const navMenu = (user) => {

  return ([
  <Components.SearchForm key="1"/>,
  <Components.ModalTrigger title="New Post" key="3" component={<Header.Item href={`https://github.com/manriquef/vulcanjs`} iconClass="fa fa-plus-square" key="4" title="New Post"/>}>
      <Components.PostsNewForm />
  </Components.ModalTrigger>,
  <Header.UserMenu
    name={user ? user.username : null}
    image={user ? user.avatar : "http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&f=y"}
    key="5"
    currentUser={user}
  />,
])};

const sb = (pickTheme, user, routerIn) => {

  let views = ["top", "new", "best"];
  const adminViews = ["pending", "rejected", "scheduled", "reported_users", "reported_posts", "reported_comments", "userUpvotedPosts", "userDownvotedPosts"];

  if (Users.canDo(user, "posts.edit.all")) {
    views = views.concat(adminViews);
  }

  const query = _.clone(routerIn.location.query);
  /*<Sidebar.UserPanel
    name={user ? user.username : "Guest"}
    image={user ? user.avatar : "http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&f=y"}
    online
    key="1"
  />,*/

  return ([
  <Sidebar.Menu header="MAIN NAVIGATION" key="2">
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
    <Sidebar.Menu.Item icon={{ className: 'fa fa-flag' }} labels={[{ key: 1, type: 'primary', text: '4' }]} title="Admin View">
      {views.map(view =>
        <LinkContainer key={view} to={{pathname: "/", query: {...query, view: view}}} className="button-item">
          <Sidebar.Menu.Item icon={{ className: 'fa fa-exclamation-triangle' }} title={<FormattedMessage id={"posts."+view}/>} />
        </LinkContainer>)}
      <LinkContainer to='/newfeeds'>
        <Sidebar.Menu.Item icon={{ className: 'fa fa-plus' }} title="New Post Feeds" />
      </LinkContainer>
      <LinkContainer to='/feeds'>
        <Sidebar.Menu.Item icon={{ className: 'fa fa-newspaper-o' }} title="Post Feeds" />
      </LinkContainer>
    </Sidebar.Menu.Item>
    <Sidebar.Menu.Item
      icon={{ className: 'fa-th' }}
      labels={[{ key: 1, type: 'success', text: 'new' }]}
      title="Widgets"
    />
    <Sidebar.Menu.Item icon={{ className: 'fa-pie-chart' }} title="Charts" >
      <Sidebar.Menu.Item title="ChartJS" />
      <Sidebar.Menu.Item title="Morris" />
      <Components.ModalTrigger title="Fixme" component={<Sidebar.Menu.Item title="Flot" />}>
       <Components.PostsNewForm />
      </Components.ModalTrigger>
      <Sidebar.Menu.Item title="Inline Charts" />
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
])};

const footer = () => {

  return([
    <strong key="1">
      <span>Copyright © 2017 </span>
      <a href="http://www.nodepeep.com">FM</a>
      <span>. </span>
    </strong>,
    <span key="2"> All rights reserved.</span>,
    <div key="3" style={{ float: 'right' }}>
      <b>Version</b><span> 1.0.0</span>
    </div>
])};

const Layout = ({currentUser, children, theme, pickTheme}) => {

  routerIn = children.props.router;

  return (
  <div className="wrapper" id="wrapper">

    {currentUser ? <Components.UsersProfileCheck currentUser={currentUser} documentId={currentUser._id} /> : null}

        <Dashboard
          navbarChildren={navMenu(currentUser)}
          sidebarChildren={sb(pickTheme,currentUser, routerIn)}
          footerChildren={footer()} // generates warnings...
          sidebarMini
          initialCollapse={false}
          fixed
          theme={theme}
        >
          <Components.HeadTags />
            <div className="main">
              <Components.FlashMessages />
            </div>
         {children}
         </Dashboard>
  </div>

)}

Layout.propTypes = {
    pickTheme: PropTypes.func,
    theme: PropTypes.string,
};

registerComponent('Layout', Layout, withCurrentUser, withRouter, connect(mapStateToProps, mapDispatchToProps));
