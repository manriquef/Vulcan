import { Components, registerComponent, withCurrentUser, ModalTrigger } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';
import { FormattedMessage, intlShape } from 'react-intl';
import { Meteor } from 'meteor/meteor';
import { Button, Dropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Users from 'meteor/vulcan:users';
import { withApollo } from 'react-apollo';

class UsersMenu extends Component {

  render() {

    const {currentUser, client} = this.props;

    return (
      <div className="users-menu">
        <Dropdown id="user-dropdown">
          <Dropdown.Toggle>
            <Components.UsersAvatar size="small" user={currentUser} link={false} />
            <div>{Users.getDisplayName(currentUser)}</div>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <LinkContainer to={`/p/${currentUser.slug}`}>
              <MenuItem className="dropdown-item" eventKey="1"><FormattedMessage id="users.profile"/></MenuItem>
            </LinkContainer>
            <LinkContainer to={`/account`}>
              <MenuItem className="dropdown-item" eventKey="2"><FormattedMessage id="users.edit_account"/></MenuItem>
            </LinkContainer>
            {currentUser.isAdmin ? <ModalTrigger title={<FormattedMessage id="posts.feeds.new"/>} component={<MenuItem className="dropdown-item" eventKey="3"><FormattedMessage id="posts.feeds.new"/></MenuItem>}>
              <Components.FeedsNewForm/></ModalTrigger> : null}
            {currentUser.isAdmin ? <LinkContainer to={`/feeds`}><MenuItem className="dropdown-item" eventKey="4"><FormattedMessage id="posts.feeds"/></MenuItem></LinkContainer>: null}
            <MenuItem className="dropdown-item" eventKey="4" onClick={() => Meteor.logout(() => client.resetStore())}><FormattedMessage id="users.log_out"/></MenuItem>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    )
  }

}

UsersMenu.propsTypes = {
  currentUser: React.PropTypes.object,
  client: React.PropTypes.object,
};


registerComponent('UsersMenu', UsersMenu, withCurrentUser, withApollo);
