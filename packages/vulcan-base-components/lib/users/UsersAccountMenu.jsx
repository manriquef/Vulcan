import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Dropdown } from 'react-bootstrap';

const UsersAccountMenu = () => {

  return (
    <Dropdown id="accounts-dropdown" className="users-account-menu">
      <Dropdown.Toggle>
        <Components.Icon name="user"/>
        <FormattedMessage id="users.sign_up_log_in"/>
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu-right">
        <Components.AccountsLoginForm />
      </Dropdown.Menu>
    </Dropdown>
  )
};

UsersAccountMenu.displayName = "UsersAccountMenu";

registerComponent('UsersAccountMenu', UsersAccountMenu);
