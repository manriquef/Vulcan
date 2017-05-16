import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Dropdown } from 'react-bootstrap';
import { STATES } from 'meteor/vulcan:accounts';

const UsersAccountMenuNoDrop = ({state}) =>

      <Components.AccountsLoginForm formState={state? STATES[state] : STATES.SIGN_UP} />


UsersAccountMenuNoDrop.displayName = "UsersAccountMenuNoDrop";

registerComponent('UsersAccountMenuNoDrop', UsersAccountMenuNoDrop);
