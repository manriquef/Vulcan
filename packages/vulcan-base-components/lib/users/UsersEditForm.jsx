import { Components, registerComponent, withCurrentUser, withMessages } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'react-intl';
import Users from 'meteor/vulcan:users';

const UsersEditForm = (props, context) => {

  return (
    <Components.ShowIf
      check={Users.options.mutations.edit.check}
      document={props.terms.documentId ? {_id: props.terms.documentId} : {slug: props.terms.slug}}
      failureComponent={<FormattedMessage id="app.noPermission"/>}
    >
      <div className="page users-edit-form">
        <h2 className="page-title users-edit-form-title"><FormattedMessage id="users.edit_account"/></h2>
        <Components.SmartForm
          collection={Users}
          {...props.terms}
          successCallback={user => {
            props.flash(context.intl.formatMessage({id: "users.edit_success"}, {name: Users.getDisplayName(user)}), 'success')
              this.props.router.push('/');
          }}
          showRemove={true}
        />
      </div>
    </Components.ShowIf>
  );
};


UsersEditForm.propTypes = {
  terms: PropTypes.object, // a user is defined by its unique _id or its unique slug
};

UsersEditForm.contextTypes = {
  addToAutofilledValues: PropTypes.func,
  intl: intlShape
};

UsersEditForm.displayName = "UsersEditForm";

registerComponent('UsersEditForm', UsersEditForm, withMessages, withCurrentUser);
