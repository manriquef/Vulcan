import { Components, registerComponent } from 'meteor/vulcan:core';
<<<<<<< HEAD
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Dropdown } from 'react-bootstrap';
=======
import React, { PropTypes, Component } from 'react';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import Dropdown from 'react-bootstrap/lib/Dropdown';
>>>>>>> VulcanJS/devel
import { STATES } from 'meteor/vulcan:accounts';

const UsersAccountMenu = ({state}) =>

  <Dropdown id="accounts-dropdown" className="users-account-menu">
    <Dropdown.Toggle>
      <Components.Icon name="user"/>
      <FormattedMessage id="users.sign_up_log_in"/>
    </Dropdown.Toggle>
    <Dropdown.Menu>
      <Components.AccountsLoginForm formState={state? STATES[state] : STATES.SIGN_UP} />
    </Dropdown.Menu>
  </Dropdown>

UsersAccountMenu.displayName = "UsersAccountMenu";

registerComponent('UsersAccountMenu', UsersAccountMenu);
